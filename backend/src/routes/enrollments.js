const express = require('express');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { auditMiddleware } = require('../utils/audit');

const router = express.Router();

const createSchema = z.object({ courseId: z.number().int().positive() });
const statusSchema = z.object({ status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED']) });

// Create enrollment (student)
/**
 * @swagger
 * /api/enrollments:
 *   post:
 *     tags: [Enrollments]
 *     summary: Đăng ký tham gia khóa học (STUDENT)
 *     description: Người dùng đã đăng nhập đăng ký vào khóa học.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courseId]
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 1
 *           example:
 *             courseId: 1
 *     responses:
 *       201:
 *         description: Tạo đơn đăng ký thành công
 *         content:
 *           application/json:
 *             example:
 *               enrollment:
 *                 id: 10
 *                 userId: 2
 *                 courseId: 1
 *                 status: PENDING
 *                 createdAt: 2026-01-05T00:00:00.000Z
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error: courseId must be a positive number
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             example:
 *               error: Missing or invalid Authorization header
 *       404:
 *         description: Không tìm thấy khóa học
 *         content:
 *           application/json:
 *             example:
 *               error: Course not found
 *       409:
 *         description: Đã đăng ký hoặc đang chờ duyệt
 *         content:
 *           application/json:
 *             example:
 *               error: Already enrolled or pending
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.post('/', authRequired, attachUser, auditMiddleware(() => ({ action: 'ENROLL', resource: 'enrollment' })), async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });
    const { courseId } = parsed.data;

    // ensure course exists
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // avoid duplicate active/pending enrollments
    const existing = await prisma.enrollment.findFirst({ where: { userId: req.currentUser.id, courseId, status: { in: ['PENDING', 'ACTIVE'] } } });
    if (existing) return res.status(409).json({ error: 'Already enrolled or pending' });

    const enr = await prisma.enrollment.create({ data: { userId: req.currentUser.id, courseId } });
    res.status(201).json({ enrollment: enr });
  } catch (e) { next(e); }
});

// List my enrollments
/**
 * @swagger
 * /api/enrollments/me:
 *   get:
 *     tags: [Enrollments]
 *     summary: Danh sách đăng ký của tôi
 *     description: Trả về danh sách các enrollment của người dùng hiện tại.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             example:
 *               enrollments:
 *                 - id: 10
 *                   userId: 2
 *                   courseId: 1
 *                   status: PENDING
 *                   createdAt: 2026-01-05T00:00:00.000Z
 *                   course:
 *                     id: 1
 *                     title: Bằng lái B1 cơ bản
 *       401:
 *         description: Chưa đăng nhập
 *         content:
 *           application/json:
 *             example:
 *               error: Missing or invalid Authorization header
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get('/me', authRequired, attachUser, async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({ where: { userId: req.currentUser.id }, include: { course: true } });
    res.json({ enrollments });
  } catch (e) { next(e); }
});

// Admin: list all enrollments
router.get('/', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({ include: { user: { select: { id: true, email: true, name: true } }, course: true } });
    res.json({ enrollments });
  } catch (e) { next(e); }
});

// Admin: update status
router.patch('/:id/status', authRequired, attachUser, requireRole('ADMIN'), auditMiddleware((req) => ({ action: 'UPDATE_STATUS', resource: `enrollment:${req.params.id}` })), async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.errors.map(e => e.message).join(', ') });

    const updated = await prisma.enrollment.update({ where: { id }, data: { status: parsed.data.status } });
    res.json({ enrollment: updated });
  } catch (e) { next(e); }
});

module.exports = router;
