const express = require('express');
const { z } = require('zod');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { audit } = require('../utils/audit');
const { sendError, parseId, formatValidationErrors } = require('../utils/api');

const router = express.Router();

const createPaymentSchema = z.object({
  enrollmentId: z.number().int().positive(),
  method: z.enum(['BANK_CARD', 'VNPAY', 'MOMO', 'ZALOPAY']),
});

const webhookSchema = z.object({
  transactionRef: z.string().min(1),
  status: z.enum(['PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED']),
  providerResponse: z.record(z.any()).optional(),
});

const refundSchema = z.object({
  paymentId: z.number().int().positive(),
  amount: z.number().int().positive().optional(),
});

function canAccessPayment(req, payment) {
  return req.currentUser.role === 'ADMIN' || payment.userId === req.currentUser.id;
}

/**
 * @swagger
 * /api/payments/create:
 *   post:
 *     tags: [Payments]
 *     summary: Tạo giao dịch thanh toán
 *     description: Yêu cầu đăng nhập bằng Bearer token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [enrollmentId, method]
 *             properties:
 *               enrollmentId:
 *                 type: integer
 *                 example: 1
 *               method:
 *                 type: string
 *                 enum: [BANK_CARD, VNPAY, MOMO, ZALOPAY]
 *                 example: VNPAY
 *           example:
 *             enrollmentId: 1
 *             method: VNPAY
 *     responses:
 *       201:
 *         description: Tạo giao dịch thành công
 *         content:
 *           application/json:
 *             example:
 *               payment:
 *                 id: 1
 *                 enrollmentId: 1
 *                 amount: 12000000
 *                 method: VNPAY
 *                 status: PENDING
 *                 transactionRef: PAY-1710000000-123
 */
router.post('/create', authRequired, attachUser, async (req, res, next) => {
  try {
    const parsed = createPaymentSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: parsed.data.enrollmentId },
      include: { course: true },
    });

    if (!enrollment) {
      return sendError(res, 404, 'NOT_FOUND', 'Enrollment not found');
    }

    if (req.currentUser.role !== 'ADMIN' && enrollment.userId !== req.currentUser.id) {
      return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    }

    const payment = await prisma.payment.create({
      data: {
        userId: enrollment.userId,
        enrollmentId: enrollment.id,
        amount: enrollment.course.price,
        method: parsed.data.method,
        status: 'PENDING',
        transactionRef: `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'PAYMENT_CREATE',
      resource: `payment:${payment.id}`,
      ipAddress: req.ip,
    });

    res.status(201).json({ payment });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/payments/webhook:
 *   post:
 *     tags: [Payments]
 *     summary: Webhook cập nhật trạng thái thanh toán
 *     description: Endpoint nhận callback từ cổng thanh toán.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [transactionRef, status]
 *             properties:
 *               transactionRef:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PROCESSING, COMPLETED, FAILED, REFUNDED]
 *               providerResponse:
 *                 type: object
 *           example:
 *             transactionRef: PAY-1710000000-123
 *             status: COMPLETED
 *             providerResponse:
 *               provider: vnpay
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             example:
 *               payment:
 *                 id: 1
 *                 status: COMPLETED
 */
router.post('/webhook', async (req, res, next) => {
  try {
    const parsed = webhookSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const payment = await prisma.payment.update({
      where: { transactionRef: parsed.data.transactionRef },
      data: {
        status: parsed.data.status,
        providerResponse: parsed.data.providerResponse || {},
      },
    });

    await audit({
      userId: payment.userId,
      action: 'PAYMENT_WEBHOOK',
      resource: `payment:${payment.id}`,
      ipAddress: req.ip,
    });

    res.json({ payment });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     tags: [Payments]
 *     summary: Lấy chi tiết giao dịch thanh toán
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
 *         description: Lấy chi tiết giao dịch thành công
 *         content:
 *           application/json:
 *             example:
 *               payment:
 *                 id: 1
 *                 amount: 12000000
 *                 method: VNPAY
 *                 status: COMPLETED
 */
router.get('/:id', authRequired, attachUser, async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    if (!id) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Request parameters are invalid');
    }

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        enrollment: true,
      },
    });

    if (!payment) {
      return sendError(res, 404, 'NOT_FOUND', 'Payment not found');
    }

    if (!canAccessPayment(req, payment)) {
      return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    }

    res.json({ payment });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/payments/refund:
 *   post:
 *     tags: [Payments]
 *     summary: Hoàn tiền giao dịch (ADMIN)
 *     description: Chỉ ADMIN mới có quyền hoàn tiền.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [paymentId]
 *             properties:
 *               paymentId:
 *                 type: integer
 *                 example: 1
 *               amount:
 *                 type: integer
 *                 example: 12000000
 *           example:
 *             paymentId: 1
 *             amount: 12000000
 *     responses:
 *       200:
 *         description: Hoàn tiền thành công
 *         content:
 *           application/json:
 *             example:
 *               payment:
 *                 id: 1
 *                 status: REFUNDED
 *                 refundedAmount: 12000000
 */
router.post('/refund', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const parsed = refundSchema.safeParse(req.body);
    if (!parsed.success) {
      return sendError(res, 400, 'INVALID_REQUEST', formatValidationErrors(parsed));
    }

    const payment = await prisma.payment.findUnique({ where: { id: parsed.data.paymentId } });
    if (!payment) {
      return sendError(res, 404, 'NOT_FOUND', 'Payment not found');
    }

    const refundAmount = parsed.data.amount || payment.amount;
    if (refundAmount > payment.amount) {
      return sendError(res, 400, 'INVALID_REQUEST', 'Refund amount exceeds payment amount');
    }

    const refunded = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'REFUNDED',
        refundedAmount: refundAmount,
      },
    });

    await audit({
      userId: req.currentUser.id,
      action: 'PAYMENT_REFUND',
      resource: `payment:${payment.id}`,
      ipAddress: req.ip,
    });

    res.json({ payment: refunded });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
