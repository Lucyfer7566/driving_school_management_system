const express = require('express');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { audit } = require('../utils/audit');
const { sendError, parseId, formatValidationErrors } = require('../utils/api');

const router = express.Router();

const userRoleSchema = z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']);
const userStatusSchema = z.enum(['ACTIVE', 'LOCKED', 'SUSPENDED', 'DISABLED']);

const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().positive().max(100).optional(),
  keyword: z.string().min(1).optional(),
  role: userRoleSchema.optional(),
  status: userStatusSchema.optional(),
  sort: z.enum(['createdAt_desc', 'createdAt_asc', 'name_asc', 'name_desc']).optional(),
});

const createUserSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(3).optional(),
  department: z.string().min(1).optional(),
  role: userRoleSchema,
  security: z.object({
    mfaEnabled: z.boolean().optional(),
    forcePasswordReset: z.boolean().optional(),
    sessionTimeout: z.number().int().positive().max(480).optional(),
  }).optional(),
});

const updateUserSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  username: z.string().min(3).optional(),
  department: z.string().min(1).nullable().optional(),
});

const updateStatusSchema = z.object({
  status: userStatusSchema,
  reason: z.string().min(1),
});

const assignRoleSchema = z.object({
  roleId: z.number().int().positive().optional(),
  roleName: userRoleSchema.optional(),
}).refine((data) => data.roleId || data.roleName, {
  message: 'roleId or roleName is required',
});

const updateSecuritySchema = z.object({
  mfaEnabled: z.boolean().optional(),
  forcePasswordReset: z.boolean().optional(),
  sessionTimeout: z.number().int().positive().max(480).optional(),
});

function getUserOrder(sort) {
  switch (sort) {
    case 'createdAt_asc':
      return { createdAt: 'asc' };
    case 'name_asc':
      return { name: 'asc' };
    case 'name_desc':
      return { name: 'desc' };
    case 'createdAt_desc':
    default:
      return { createdAt: 'desc' };
  }
}

function resolveRole({ roleId, roleName }) {
  if (roleName) return roleName;
  if (roleId === 1) return 'ADMIN';
  if (roleId === 2) return 'INSTRUCTOR';
  if (roleId === 3) return 'STUDENT';
  return null;
}

function canAccessOwnResource(req, targetUserId) {
  return req.currentUser?.role === 'ADMIN' || req.currentUser?.id === targetUserId;
}

async function findUserOr404(res, id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      username: true,
      name: true,
      department: true,
      role: true,
      status: true,
      mfaEnabled: true,
      forcePasswordReset: true,
      sessionTimeout: true,
      lastLoginAt: true,
      lastLoginIp: true,
      passwordResetAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    sendError(res, 404, 'NOT_FOUND', 'User not found');
    return null;
  }

  return user;
}

function buildRoadmap(courseTitle = 'khóa học hiện tại') {
  return [
    { step: 1, title: 'Đăng ký & Nộp hồ sơ', status: 'COMPLETED', courseTitle },
    { step: 2, title: 'Lý thuyết & Đạo đức', status: 'IN_PROGRESS', courseTitle },
    { step: 3, title: 'Tập lái xe sa hình', status: 'PENDING', courseTitle },
    { step: 4, title: 'Chạy đường trường DAT', status: 'PENDING', courseTitle },
    { step: 5, title: 'Thi chứng chỉ & Sát hạch', status: 'PENDING', courseTitle },
    { step: 6, title: 'Nhận bằng lái', status: 'PENDING', courseTitle },
  ];
}

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags: [Users]
 *     summary: Lấy thông tin hồ sơ người dùng hiện tại
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
 *                 email: student1@gmail.com
 *                 name: Student One
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
 */
router.get('/me', authRequired, attachUser, (req, res) => {
  if (!req.currentUser) {
    return sendError(res, 404, 'NOT_FOUND', 'User not found');
  }
  return res.json({ user: req.currentUser });
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Danh sách người dùng (ADMIN)
 *     description: Chỉ ADMIN mới có quyền truy cập.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           example: 20
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: nguyen
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ADMIN, INSTRUCTOR, STUDENT]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, LOCKED, SUSPENDED, DISABLED]
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: createdAt_desc
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   email: admin@gmail.com
 *                   name: Admin
 *                   role: ADMIN
 *                   status: ACTIVE
 *               pagination:
 *                 page: 1
 *                 size: 20
 *                 total: 1
 *       400:
 *         description: Query không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       401:
 *         description: Không có quyền truy cập (chưa đăng nhập)
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: UNAUTHORIZED
 *                 message: Missing or invalid Authorization header
 *       403:
 *         description: Không đủ quyền (không phải ADMIN)
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: FORBIDDEN
 *                 message: "Forbidden: insufficient role"
 */
router.get('/', authRequired, attachUser, async (req, res, next) => {
  try {
    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    if (req.currentUser.role !== 'ADMIN' && parsed.data.role !== 'INSTRUCTOR') {
      return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    }

    const { page = 1, size = 20, keyword, role, status, sort = 'createdAt_desc' } = parsed.data;
    const where = {};
    if (role) where.role = role;
    if (status) where.status = status;
    if (keyword) {
      where.OR = [
        { name: { contains: keyword } },
        { email: { contains: keyword } },
        { username: { contains: keyword } },
        { department: { contains: keyword } },
      ];
    }

    const skip = (page - 1) * size;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          email: true,
          username: true,
          name: true,
          department: true,
          role: true,
          status: true,
          lastLoginAt: true,
          lastLoginIp: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: getUserOrder(sort),
        skip,
        take: size,
      }),
      prisma.user.count({ where }),
    ]);

    res.json({ users, pagination: { page, size, total } });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Tạo người dùng mới (ADMIN)
 *     description: Chỉ ADMIN mới có quyền tạo người dùng mới.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, role]
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@gmail.com
 *               username:
 *                 type: string
 *                 example: nguyenvana
 *               department:
 *                 type: string
 *                 example: Admissions
 *               role:
 *                 type: string
 *                 enum: [ADMIN, INSTRUCTOR, STUDENT]
 *                 example: STUDENT
 *               security:
 *                 type: object
 *                 properties:
 *                   mfaEnabled:
 *                     type: boolean
 *                   forcePasswordReset:
 *                     type: boolean
 *                   sessionTimeout:
 *                     type: integer
 *           example:
 *             fullName: Nguyen Van A
 *             email: user@gmail.com
 *             username: nguyenvana
 *             department: Admissions
 *             role: STUDENT
 *             security:
 *               mfaEnabled: false
 *               forcePasswordReset: true
 *               sessionTimeout: 30
 *     responses:
 *       201:
 *         description: Tạo người dùng thành công
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 10
 *                 email: user@gmail.com
 *                 username: nguyenvana
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
 *         description: Email hoặc username đã tồn tại
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: CONFLICT
 *                 message: email already exists
 */
router.post('/', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const { fullName, email, username, department, role, security } = parsed.data;
    const password = await bcrypt.hash(process.env.DEFAULT_USER_PASSWORD || 'ChangeMe123!', 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password,
        name: fullName,
        department,
        role,
        forcePasswordReset: security?.forcePasswordReset ?? true,
        mfaEnabled: security?.mfaEnabled ?? false,
        sessionTimeout: security?.sessionTimeout ?? 30,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        department: true,
        role: true,
        status: true,
        mfaEnabled: true,
        forcePasswordReset: true,
        sessionTimeout: true,
        createdAt: true,
      },
    });

    res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/roadmap:
 *   get:
 *     tags: [Users]
 *     summary: Lấy lộ trình học của người dùng
 *     description: Yêu cầu đăng nhập bằng Bearer token. ADMIN có thể xem mọi người dùng, người dùng thường chỉ xem của chính mình.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Lấy lộ trình thành công
 *         content:
 *           application/json:
 *             example:
 *               roadmap:
 *                 userId: 2
 *                 milestones:
 *                   - step: 1
 *                     title: Đăng ký & Nộp hồ sơ
 *                     status: COMPLETED
 *                   - step: 2
 *                     title: Lý thuyết & Đạo đức
 *                     status: IN_PROGRESS
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: UNAUTHORIZED
 *                 message: Missing or invalid Authorization header
 *       403:
 *         description: Không đủ quyền
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: FORBIDDEN
 *                 message: "Forbidden: insufficient role"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: User not found
 */
router.get('/:id/roadmap', authRequired, attachUser, async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }
    if (!canAccessOwnResource(req, id)) {
      return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    }

    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true } });
    if (!user) {
      return sendError(res, 404, 'NOT_FOUND', 'User not found');
    }

    const latestEnrollment = await prisma.enrollment.findFirst({
      where: { userId: id },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      roadmap: {
        userId: user.id,
        milestones: buildRoadmap(latestEnrollment?.course?.title),
      },
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/recommendations:
 *   get:
 *     tags: [Users]
 *     summary: Lấy khóa học gợi ý cho người dùng
 *     description: Yêu cầu đăng nhập bằng Bearer token. ADMIN có thể xem mọi người dùng, người dùng thường chỉ xem của chính mình.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Lấy gợi ý thành công
 *         content:
 *           application/json:
 *             example:
 *               recommendations:
 *                 - id: 3
 *                   title: Bằng lái C
 *                   licenseType: C
 *                   price: 18000000
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: UNAUTHORIZED
 *                 message: Missing or invalid Authorization header
 *       403:
 *         description: Không đủ quyền
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: FORBIDDEN
 *                 message: "Forbidden: insufficient role"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: User not found
 */
router.get('/:id/recommendations', authRequired, attachUser, async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }
    if (!canAccessOwnResource(req, id)) {
      return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    }

    const user = await prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!user) {
      return sendError(res, 404, 'NOT_FOUND', 'User not found');
    }

    const enrolledCourseIds = await prisma.enrollment.findMany({
      where: { userId: id },
      select: { courseId: true },
    });

    const recommendations = await prisma.course.findMany({
      where: {
        id: { notIn: enrolledCourseIds.map((item) => item.courseId) },
      },
      orderBy: { price: 'asc' },
      take: 3,
    });

    res.json({ recommendations });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Lấy chi tiết người dùng (ADMIN)
 *     description: Chỉ ADMIN mới có quyền truy cập.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 1
 *                 email: admin@gmail.com
 *                 name: Admin
 *                 role: ADMIN
 *                 status: ACTIVE
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: User not found
 */
router.get('/:id', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const user = await findUserOr404(res, id);
    if (!user) return;

    res.json({ user });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Cập nhật thông tin người dùng (ADMIN)
 *     description: Chỉ ADMIN mới có quyền cập nhật người dùng.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 1
 *                 email: updated@gmail.com
 *                 username: updateduser
 *                 name: Updated User
 *                 department: Admissions
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
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: UNAUTHORIZED
 *                 message: Missing or invalid Authorization header
 *       403:
 *         description: Không đủ quyền
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: FORBIDDEN
 *                 message: "Forbidden: insufficient role"
 *       404:
 *         description: Không tìm thấy người dùng
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: User not found
 */
router.put('/:id', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 404, 'NOT_FOUND', 'User not found');
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        email: parsed.data.email,
        username: parsed.data.username,
        name: parsed.data.fullName,
        department: parsed.data.department,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        department: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({ user });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/status:
 *   patch:
 *     tags: [Users]
 *     summary: Cập nhật trạng thái tài khoản (ADMIN)
 *     description: Chỉ ADMIN mới có quyền thay đổi trạng thái tài khoản.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status, reason]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, LOCKED, SUSPENDED, DISABLED]
 *               reason:
 *                 type: string
 *           example:
 *             status: SUSPENDED
 *             reason: Policy violation
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 2
 *                 email: student@gmail.com
 *                 name: Student
 *                 role: STUDENT
 *                 status: SUSPENDED
 */
router.patch('/:id/status', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const user = await prisma.user.update({
      where: { id },
      data: { status: parsed.data.status },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'ACCOUNT_STATUS_CHANGE',
      resource: `user:${id}:${parsed.data.reason}`,
      ipAddress: req.ip,
    });

    res.json({ user });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/roles:
 *   post:
 *     tags: [Users]
 *     summary: Gán vai trò người dùng (ADMIN)
 *     description: Chỉ ADMIN mới có quyền thay đổi vai trò người dùng.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 2
 *               roleName:
 *                 type: string
 *                 enum: [ADMIN, INSTRUCTOR, STUDENT]
 *                 example: INSTRUCTOR
 *           example:
 *             roleName: INSTRUCTOR
 *     responses:
 *       200:
 *         description: Gán vai trò thành công
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 id: 2
 *                 email: user@gmail.com
 *                 name: User
 *                 role: INSTRUCTOR
 *                 status: ACTIVE
 */
router.post('/:id/roles', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const parsed = assignRoleSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const role = resolveRole(parsed.data);
    if (!role) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'ROLE_CHANGE',
      resource: `user:${id}:${role}`,
      ipAddress: req.ip,
    });

    res.status(200).json({ user });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/security:
 *   get:
 *     tags: [Users]
 *     summary: Lấy cấu hình bảo mật người dùng (ADMIN)
 *     description: Chỉ ADMIN mới có quyền truy cập.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Lấy cấu hình bảo mật thành công
 *         content:
 *           application/json:
 *             example:
 *               security:
 *                 userId: 2
 *                 mfaEnabled: true
 *                 forcePasswordReset: false
 *                 sessionTimeout: 30
 *                 status: ACTIVE
 */
router.get('/:id/security', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const user = await findUserOr404(res, id);
    if (!user) return;

    const recentEvents = await prisma.auditLog.findMany({
      where: {
        OR: [
          { userId: id },
          { resource: { contains: `user:${id}` } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    res.json({
      security: {
        userId: user.id,
        mfaEnabled: user.mfaEnabled,
        forcePasswordReset: user.forcePasswordReset,
        sessionTimeout: user.sessionTimeout,
        status: user.status,
        lastLoginAt: user.lastLoginAt,
        lastLoginIp: user.lastLoginIp,
        passwordResetAt: user.passwordResetAt,
        recentEvents,
      },
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/security:
 *   patch:
 *     tags: [Users]
 *     summary: Cập nhật cấu hình bảo mật người dùng (ADMIN)
 *     description: Chỉ ADMIN mới có quyền cập nhật.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mfaEnabled:
 *                 type: boolean
 *               forcePasswordReset:
 *                 type: boolean
 *               sessionTimeout:
 *                 type: integer
 *           example:
 *             mfaEnabled: true
 *             forcePasswordReset: false
 *             sessionTimeout: 30
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             example:
 *               security:
 *                 id: 2
 *                 mfaEnabled: true
 *                 forcePasswordReset: false
 *                 sessionTimeout: 30
 */
router.patch('/:id/security', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const parsed = updateSecuritySchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const security = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        mfaEnabled: true,
        forcePasswordReset: true,
        sessionTimeout: true,
        status: true,
        updatedAt: true,
      },
    });

    res.json({ security });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/reset-password:
 *   post:
 *     tags: [Users]
 *     summary: Yêu cầu đặt lại mật khẩu (ADMIN)
 *     description: Chỉ ADMIN mới có quyền đặt trạng thái buộc đổi mật khẩu và vô hiệu hóa phiên hiện tại của người dùng.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Thực hiện thành công
 *         content:
 *           application/json:
 *             example:
 *               message: Password reset enforced successfully
 */
router.post('/:id/reset-password', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    await prisma.user.update({
      where: { id },
      data: {
        forcePasswordReset: true,
        passwordResetAt: new Date(),
        sessionVersion: { increment: 1 },
        refreshTokenVersion: { increment: 1 },
      },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'PASSWORD_RESET',
      resource: `user:${id}`,
      ipAddress: req.ip,
    });

    res.json({ message: 'Password reset enforced successfully' });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/users/{id}/revoke-sessions:
 *   post:
 *     tags: [Users]
 *     summary: Thu hồi toàn bộ phiên đăng nhập (ADMIN)
 *     description: Chỉ ADMIN mới có quyền thu hồi phiên đăng nhập của người dùng.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Thu hồi thành công
 *         content:
 *           application/json:
 *             example:
 *               message: Sessions revoked successfully
 */
router.post('/:id/revoke-sessions', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    await prisma.user.update({
      where: { id },
      data: {
        sessionVersion: { increment: 1 },
        refreshTokenVersion: { increment: 1 },
      },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'SESSION_REVOCATION',
      resource: `user:${id}`,
      ipAddress: req.ip,
    });

    res.json({ message: 'Sessions revoked successfully' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
