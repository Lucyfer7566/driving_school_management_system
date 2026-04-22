const express = require('express');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { sendError, parseId, parsePagination, formatValidationErrors } = require('../utils/api');

const router = express.Router();

const generateScheduleSchema = z.object({
  courseId: z.number().int().positive().optional(),
  instructorId: z.number().int().positive(),
  studentId: z.number().int().positive(),
  lessonDate: z.string().datetime(),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  notes: z.string().optional(),
});

const scheduleListQuerySchema = z.object({
  instructorId: z.coerce.number().int().positive().optional(),
  studentId: z.coerce.number().int().positive().optional(),
  courseId: z.coerce.number().int().positive().optional(),
  status: z.enum(['SCHEDULED', 'COMPLETED', 'CANCELLED']).optional(),
  skip: z.coerce.number().int().min(0).optional(),
  take: z.coerce.number().int().positive().max(100).optional(),
});

function scheduleScope(req, where = {}) {
  if (req.currentUser.role === 'ADMIN') return where;
  if (req.currentUser.role === 'INSTRUCTOR') return { ...where, instructorId: req.currentUser.id };
  return { ...where, studentId: req.currentUser.id };
}

/**
 * @swagger
 * /api/schedules/generate:
 *   post:
 *     tags: [Schedules]
 *     summary: Tự động tạo lịch học
 *     description: Yêu cầu đăng nhập bằng Bearer token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [instructorId, studentId, lessonDate, startTime, endTime]
 *             properties:
 *               courseId:
 *                 type: integer
 *                 example: 1
 *               instructorId:
 *                 type: integer
 *                 example: 3
 *               studentId:
 *                 type: integer
 *                 example: 5
 *               lessonDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T00:00:00.000Z"
 *               startTime:
 *                 type: string
 *                 example: "08:00"
 *               endTime:
 *                 type: string
 *                 example: "10:00"
 *               notes:
 *                 type: string
 *                 example: First practical lesson
 *           example:
 *             courseId: 1
 *             instructorId: 3
 *             studentId: 5
 *             lessonDate: "2026-05-01T00:00:00.000Z"
 *             startTime: "08:00"
 *             endTime: "10:00"
 *             notes: First practical lesson
 *     responses:
 *       201:
 *         description: Tạo lịch học thành công
 *         content:
 *           application/json:
 *             example:
 *               schedule:
 *                 id: 1
 *                 courseId: 1
 *                 instructorId: 3
 *                 studentId: 5
 *                 status: SCHEDULED
 */
router.post('/generate', authRequired, attachUser, async (req, res, next) => {
  try {
    const parsed = generateScheduleSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const lessonDate = new Date(parsed.data.lessonDate);
    const conflict = await prisma.schedule.findFirst({
      where: {
        lessonDate,
        OR: [
          { instructorId: parsed.data.instructorId },
          { studentId: parsed.data.studentId },
        ],
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
        status: 'SCHEDULED',
      },
    });

    if (conflict) {
      return sendError(res, 409, 'SCHEDULE_CONFLICT', 'Schedule conflict detected');
    }

    const schedule = await prisma.schedule.create({
      data: {
        courseId: parsed.data.courseId,
        instructorId: parsed.data.instructorId,
        studentId: parsed.data.studentId,
        lessonDate,
        startTime: parsed.data.startTime,
        endTime: parsed.data.endTime,
        notes: parsed.data.notes,
      },
    });

    res.status(201).json({ schedule });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/schedules:
 *   get:
 *     tags: [Schedules]
 *     summary: Danh sách lịch học
 *     description: Yêu cầu đăng nhập bằng Bearer token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: instructorId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: courseId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [SCHEDULED, COMPLETED, CANCELLED]
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: query
 *         name: take
 *         schema:
 *           type: integer
 *           example: 20
 *     responses:
 *       200:
 *         description: Lấy danh sách lịch học thành công
 *         content:
 *           application/json:
 *             example:
 *               schedules:
 *                 - id: 1
 *                   status: SCHEDULED
 *               pagination:
 *                 skip: 0
 *                 take: 20
 *                 total: 1
 */
router.get('/', authRequired, attachUser, async (req, res, next) => {
  try {
    const parsed = scheduleListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const where = {};
    if (parsed.data.instructorId) where.instructorId = parsed.data.instructorId;
    if (parsed.data.studentId) where.studentId = parsed.data.studentId;
    if (parsed.data.courseId) where.courseId = parsed.data.courseId;
    if (parsed.data.status) where.status = parsed.data.status;

    const scopedWhere = scheduleScope(req, where);
    const { skip, take } = parsePagination(parsed.data, { skip: 0, take: 20, maxTake: 100 });

    const [schedules, total] = await Promise.all([
      prisma.schedule.findMany({
        where: scopedWhere,
        include: {
          course: true,
          instructor: { select: { id: true, name: true, email: true } },
          student: { select: { id: true, name: true, email: true } },
        },
        orderBy: [{ lessonDate: 'asc' }, { startTime: 'asc' }],
        skip,
        take,
      }),
      prisma.schedule.count({ where: scopedWhere }),
    ]);

    res.json({ schedules, pagination: { skip, take, total } });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/schedules/{id}:
 *   get:
 *     tags: [Schedules]
 *     summary: Lấy chi tiết lịch học
 *     description: Yêu cầu đăng nhập bằng Bearer token.
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
 *         description: Lấy chi tiết lịch học thành công
 *         content:
 *           application/json:
 *             example:
 *               schedule:
 *                 id: 1
 *                 courseId: 1
 *                 instructorId: 3
 *                 studentId: 5
 *                 status: SCHEDULED
 */
router.get('/:id', authRequired, attachUser, async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: {
        course: true,
        instructor: { select: { id: true, name: true, email: true } },
        student: { select: { id: true, name: true, email: true } },
      },
    });

    if (!schedule) {
      return sendError(res, 404, 'NOT_FOUND', 'Schedule not found');
    }

    const allowed = req.currentUser.role === 'ADMIN'
      || schedule.instructorId === req.currentUser.id
      || schedule.studentId === req.currentUser.id;

    if (!allowed) {
      return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    }

    res.json({ schedule });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
