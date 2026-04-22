const express = require('express');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { audit } = require('../utils/audit');
const { sendError, formatValidationErrors } = require('../utils/api');

const router = express.Router();

const permissionUpdateSchema = z.object({
  permissions: z.array(z.string().min(1)).min(1),
});

const defaultPermissions = {
  ADMIN: ['users.read', 'users.write', 'roles.manage', 'payments.manage', 'schedules.manage', 'audit.read'],
  INSTRUCTOR: ['courses.read', 'enrollments.read', 'schedules.read'],
  STUDENT: ['courses.read', 'enrollments.create', 'roadmap.read'],
};

function resolveRoleId(id) {
  const value = String(id).toUpperCase();
  if (['ADMIN', 'INSTRUCTOR', 'STUDENT'].includes(value)) return value;
  if (value === '1') return 'ADMIN';
  if (value === '2') return 'INSTRUCTOR';
  if (value === '3') return 'STUDENT';
  return null;
}

/**
 * @swagger
 * /api/roles/{id}/permissions:
 *   get:
 *     tags: [Roles]
 *     summary: Lấy danh sách quyền của vai trò (ADMIN)
 *     description: Chỉ ADMIN mới có quyền truy cập.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: ADMIN
 *     responses:
 *       200:
 *         description: Lấy danh sách quyền thành công
 *         content:
 *           application/json:
 *             example:
 *               role:
 *                 id: ADMIN
 *                 permissions:
 *                   - users.read
 *                   - users.write
 *       400:
 *         description: Vai trò không hợp lệ
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
 */
router.get('/:id/permissions', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const role = resolveRoleId(req.params.id);
    if (!role) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const rolePermissions = await prisma.rolePermission.findUnique({ where: { role } });
    if (!rolePermissions && !defaultPermissions[role]) {
      return sendError(res, 404, 'NOT_FOUND', 'Role not found');
    }

    res.json({
      role: {
        id: role,
        permissions: rolePermissions?.permissions || defaultPermissions[role],
      },
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/roles/{id}/permissions:
 *   put:
 *     tags: [Roles]
 *     summary: Cập nhật danh sách quyền của vai trò (ADMIN)
 *     description: Chỉ ADMIN mới có quyền cập nhật.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: INSTRUCTOR
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [permissions]
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *           example:
 *             permissions:
 *               - courses.read
 *               - schedules.read
 *               - schedules.write
 *     responses:
 *       200:
 *         description: Cập nhật quyền thành công
 *         content:
 *           application/json:
 *             example:
 *               role:
 *                 id: INSTRUCTOR
 *                 permissions:
 *                   - courses.read
 *                   - schedules.read
 *                   - schedules.write
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 */
router.put('/:id/permissions', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const role = resolveRoleId(req.params.id);
    if (!role) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const parsed = permissionUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const rolePermission = await prisma.rolePermission.upsert({
      where: { role },
      update: { permissions: parsed.data.permissions },
      create: { role, permissions: parsed.data.permissions },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'PERMISSION_UPDATE',
      resource: `role:${role}`,
      ipAddress: req.ip,
    });

    res.json({
      role: {
        id: rolePermission.role,
        permissions: rolePermission.permissions,
      },
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
