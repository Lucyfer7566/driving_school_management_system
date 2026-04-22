const express = require('express');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { auditMiddleware } = require('../utils/audit');
const { sendError, parseId, formatValidationErrors, parsePagination } = require('../utils/api');

const router = express.Router();

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  licenseType: z.string().min(1),
  price: z.number().int().nonnegative(),
  duration: z.string().min(1),
});

const courseListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  size: z.coerce.number().int().positive().max(100).optional(),
  category: z.string().min(1).optional(),
  sort: z.enum(['price_asc', 'price_desc', 'newest', 'oldest', 'title_asc', 'title_desc']).optional(),
  keyword: z.string().min(1).optional(),
});

function getCourseOrder(sort) {
  switch (sort) {
    case 'price_asc':
      return { price: 'asc' };
    case 'price_desc':
      return { price: 'desc' };
    case 'oldest':
      return { createdAt: 'asc' };
    case 'title_asc':
      return { title: 'asc' };
    case 'title_desc':
      return { title: 'desc' };
    case 'newest':
    default:
      return { createdAt: 'desc' };
  }
}

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [Courses]
 *     summary: Danh sách khóa học
 *     description: Công khai, không yêu cầu đăng nhập.
 *     security: []
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
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: B1
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: price_asc
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: bang lai
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             example:
 *               courses:
 *                 - id: 1
 *                   title: Bằng lái B1 cơ bản
 *                   description: Khóa học lý thuyết và thực hành cho bằng B1
 *                   licenseType: B1
 *                   price: 8000000
 *                   duration: 2 tháng
 *                   createdAt: 2026-01-01T00:00:00.000Z
 *                   updatedAt: 2026-01-02T00:00:00.000Z
 *               pagination:
 *                 page: 1
 *                 size: 10
 *                 total: 1
 *       400:
 *         description: Query không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.get('/', async (req, res, next) => {
  try {
    const parsed = courseListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const { page = 1, size = 10, category, sort = 'newest', keyword } = parsed.data;
    const skip = (page - 1) * size;
    const where = {};

    if (category) {
      where.licenseType = category;
    }

    if (keyword) {
      where.OR = [
        { title: { contains: keyword } },
        { description: { contains: keyword } },
        { licenseType: { contains: keyword } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        orderBy: getCourseOrder(sort),
        skip,
        take: size,
      }),
      prisma.course.count({ where }),
    ]);

    res.json({
      courses,
      pagination: { page, size, total },
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/courses/compare:
 *   get:
 *     tags: [Courses]
 *     summary: So sánh nhiều khóa học
 *     description: Công khai, không yêu cầu đăng nhập.
 *     security: []
 *     parameters:
 *       - in: query
 *         name: ids
 *         required: true
 *         schema:
 *           type: string
 *           example: 1,2,3
 *         description: Danh sách ID khóa học, phân tách bằng dấu phẩy
 *     responses:
 *       200:
 *         description: So sánh thành công
 *         content:
 *           application/json:
 *             example:
 *               courses:
 *                 - id: 1
 *                   title: Bằng lái B1 cơ bản
 *                   licenseType: B1
 *                   price: 8000000
 *                   duration: 2 tháng
 *                 - id: 2
 *                   title: Bằng lái B2 nâng cao
 *                   licenseType: B2
 *                   price: 12000000
 *                   duration: 3 tháng
 *       400:
 *         description: Query không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       404:
 *         description: Không tìm thấy khóa học
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: Course not found
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.get('/compare', async (req, res, next) => {
  try {
    const ids = String(req.query.ids || '')
      .split(',')
      .map((value) => parseId(value.trim()))
      .filter(Boolean);

    if (!ids.length) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const courses = await prisma.course.findMany({
      where: { id: { in: ids } },
      orderBy: { id: 'asc' },
    });

    if (!courses.length) {
      return sendError(res, 404, 'NOT_FOUND', 'Course not found');
    }

    res.json({ courses });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     tags: [Courses]
 *     summary: Lấy chi tiết khóa học theo ID
 *     description: Công khai, không yêu cầu đăng nhập.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             example:
 *               course:
 *                 id: 1
 *                 title: Bằng lái B1 cơ bản
 *                 description: Khóa học lý thuyết và thực hành cho bằng B1
 *                 licenseType: B1
 *                 price: 8000000
 *                 duration: 2 tháng
 *                 createdAt: 2026-01-01T00:00:00.000Z
 *                 updatedAt: 2026-01-02T00:00:00.000Z
 *       400:
 *         description: ID không hợp lệ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INVALID_REQUEST
 *                 message: Request parameters are invalid
 *       404:
 *         description: Không tìm thấy khóa học
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: Course not found
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) {
      return sendError(res, 404, 'NOT_FOUND', 'Course not found');
    }
    res.json({ course });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags: [Courses]
 *     summary: Tạo khóa học (ADMIN)
 *     description: Chỉ ADMIN mới có quyền tạo khóa học mới.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, licenseType, price, duration]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Bằng lái B2 nâng cao
 *               description:
 *                 type: string
 *                 example: Khóa học thực hành nâng cao cho bằng B2
 *               licenseType:
 *                 type: string
 *                 example: B2
 *               price:
 *                 type: integer
 *                 example: 12000000
 *               duration:
 *                 type: string
 *                 example: 3 tháng
 *           example:
 *             title: Bằng lái B2 nâng cao
 *             description: Khóa học thực hành nâng cao cho bằng B2
 *             licenseType: B2
 *             price: 12000000
 *             duration: 3 tháng
 *     responses:
 *       201:
 *         description: Tạo thành công
 *         content:
 *           application/json:
 *             example:
 *               course:
 *                 id: 2
 *                 title: Bằng lái B2 nâng cao
 *                 description: Khóa học thực hành nâng cao cho bằng B2
 *                 licenseType: B2
 *                 price: 12000000
 *                 duration: 3 tháng
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
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.post('/', authRequired, attachUser, requireRole('ADMIN'), auditMiddleware(() => ({ action: 'CREATE', resource: 'course' })), async (req, res, next) => {
  try {
    const parsed = courseSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }
    const course = await prisma.course.create({ data: parsed.data });
    res.status(201).json({ course });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     tags: [Courses]
 *     summary: Cập nhật khóa học (ADMIN)
 *     description: Chỉ ADMIN mới có quyền cập nhật khóa học.
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
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               licenseType:
 *                 type: string
 *               price:
 *                 type: integer
 *               duration:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             example:
 *               course:
 *                 id: 2
 *                 title: Bằng lái B2 nâng cao (Cập nhật)
 *       400:
 *         description: ID không hợp lệ hoặc dữ liệu không hợp lệ
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
 *         description: Không tìm thấy khóa học
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: NOT_FOUND
 *                 message: Course not found
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 code: INTERNAL_SERVER_ERROR
 *                 message: Internal Server Error
 */
router.put('/:id', authRequired, attachUser, requireRole('ADMIN'), auditMiddleware((req) => ({ action: 'UPDATE', resource: `course:${req.params.id}` })), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const parsed = courseSchema.partial().safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const existing = await prisma.course.findUnique({ where: { id } });
    if (!existing) {
      return sendError(res, 404, 'NOT_FOUND', 'Course not found');
    }

    const course = await prisma.course.update({ where: { id }, data: parsed.data });
    res.json({ course });
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', authRequired, attachUser, requireRole('ADMIN'), auditMiddleware((req) => ({ action: 'DELETE', resource: `course:${req.params.id}` })), async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }
    await prisma.enrollment.deleteMany({ where: { courseId: id } });
    await prisma.course.delete({ where: { id } });
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
