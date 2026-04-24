const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { audit } = require('../utils/audit');
const { authRequired, attachUser } = require('../middleware/auth');
const { sendError, formatValidationErrors } = require('../utils/api');

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

function signAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    sessionVersion: user.sessionVersion,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'devsecret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

function signRefreshToken(user) {
  const payload = {
    id: user.id,
    type: 'refresh',
    version: user.refreshTokenVersion,
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'devsecret', {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
}

function authPayload(user) {
  return {
    token: signAccessToken(user),
    refreshToken: signRefreshToken(user),
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      department: user.department,
      role: user.role,
      status: user.status,
    },
  };
}

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng ký tài khoản mới
 *     description: Tạo người dùng mới và trả về JWT token cùng thông tin người dùng.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: P@ssw0rd!
 *               name:
 *                 type: string
 *                 example: Nguyen Van A
 *           example:
 *             email: test@gmail.com
 *             password: P@ssw0rd!
 *             name: Nguyen Van A
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 1
 *                 email: test@gmail.com
 *                 name: Nguyen Van A
 *                 role: STUDENT
 *                 status: ACTIVE
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       409:
 *         description: Email đã tồn tại
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: CONFLICT
 *                 message: email already exists
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.post('/register', async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const { email, password, name } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return sendError(res, 409, 'CONFLICT', 'email already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name },
    });

    res.status(201).json(authPayload(user));
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng nhập và nhận JWT token
 *     description: Xác thực bằng email và mật khẩu, trả về token và thông tin người dùng.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: P@ssw0rd!
 *           example:
 *             email: test@gmail.com
 *             password: P@ssw0rd!
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 1
 *                 email: test@gmail.com
 *                 name: Nguyen Van A
 *                 role: STUDENT
 *                 status: ACTIVE
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       401:
 *         description: Sai thông tin đăng nhập
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_CREDENTIALS
 *                 message: Invalid credentials
 *       403:
 *         description: Tài khoản không hoạt động
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: ACCOUNT_STATUS_INVALID
 *                 message: Account is suspended
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.post('/login', async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const { email, password } = parsed.data;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      await audit({ action: 'LOGIN', resource: 'auth', status: 'FAILURE', ipAddress: req.ip });
      return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid credentials');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      await audit({ userId: user.id, action: 'LOGIN', resource: 'auth', status: 'FAILURE', ipAddress: req.ip });
      return sendError(res, 401, 'INVALID_CREDENTIALS', 'Invalid credentials');
    }

    if (user.status !== 'ACTIVE') {
      await audit({ userId: user.id, action: 'LOGIN', resource: 'auth', status: 'FAILURE', ipAddress: req.ip });
      return sendError(res, 403, 'ACCOUNT_STATUS_INVALID', `Account is ${user.status.toLowerCase()}`);
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lastLoginIp: req.ip,
      },
    });

    await audit({ userId: user.id, action: 'LOGIN', resource: 'auth', status: 'SUCCESS', ipAddress: req.ip });
    res.json(authPayload(updatedUser));
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng xuất tài khoản hiện tại
 *     description: Yêu cầu đăng nhập bằng Bearer token. Phiên đăng nhập hiện tại sẽ bị vô hiệu hóa.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             example:
 *               message: Logged out successfully
 *       401:
 *         description: Thiếu hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: UNAUTHORIZED
 *                 message: Missing or invalid Authorization header
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.post('/logout', authRequired, attachUser, async (req, res, next) => {
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        sessionVersion: { increment: 1 },
        refreshTokenVersion: { increment: 1 },
      },
    });

    res.json({ message: 'Logged out successfully' });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags: [Auth]
 *     summary: Làm mới JWT token
 *     description: Cấp lại access token và refresh token mới từ refresh token hợp lệ.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *           example:
 *             refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Làm mới token thành công
 *         content:
 *           application/json:
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               user:
 *                 id: 1
 *                 email: test@gmail.com
 *                 name: Nguyen Van A
 *                 role: STUDENT
 *                 status: ACTIVE
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       401:
 *         description: Refresh token không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REFRESH_TOKEN
 *                 message: Refresh token is invalid or expired
 *       403:
 *         description: Tài khoản không hoạt động
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: ACCOUNT_STATUS_INVALID
 *                 message: Account is disabled
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.post('/refresh-token', async (req, res, next) => {
  try {
    const parsed = refreshTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    let payload;
    try {
      payload = jwt.verify(
        parsed.data.refreshToken,
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'devsecret',
      );
    } catch (_) {
      return sendError(res, 401, 'INVALID_REFRESH_TOKEN', 'Refresh token is invalid or expired');
    }

    if (payload.type !== 'refresh') {
      return sendError(res, 401, 'INVALID_REFRESH_TOKEN', 'Refresh token is invalid or expired');
    }

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user || user.refreshTokenVersion !== payload.version) {
      return sendError(res, 401, 'INVALID_REFRESH_TOKEN', 'Refresh token is invalid or expired');
    }

    if (user.status !== 'ACTIVE') {
      return sendError(res, 403, 'ACCOUNT_STATUS_INVALID', `Account is ${user.status.toLowerCase()}`);
    }

    res.json(authPayload(user));
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Lấy thông tin người dùng hiện tại
 *     description: Yêu cầu đăng nhập bằng Bearer token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 1
 *                 email: test@gmail.com
 *                 name: Nguyen Van A
 *                 role: STUDENT
 *                 status: ACTIVE
 *       401:
 *         description: Thiếu hoặc token không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: UNAUTHORIZED
 *                 message: Missing or invalid Authorization header
 *       404:
 *         description: Người dùng không tồn tại
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: User not found
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.get('/me', authRequired, attachUser, (req, res) => {
  if (!req.currentUser) {
    return sendError(res, 404, 'NOT_FOUND', 'User not found');
  }
  return res.json({ user: req.currentUser });
});

module.exports = router;
