const express = require('express');
const { prisma } = require('../lib/prisma');
const { authRequired, attachUser } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');

const router = express.Router();

// Admin: list audit logs with basic filters
router.get('/', authRequired, attachUser, requireRole('ADMIN'), async (req, res, next) => {
  try {
    const { userId, action, resource, status, skip = '0', take = '50' } = req.query;
    const where = {};
    if (userId) where.userId = Number(userId);
    if (action) where.action = String(action);
    if (resource) where.resource = String(resource);
    if (status) where.status = String(status);

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { id: 'desc' },
      skip: Number(skip),
      take: Math.min(Number(take), 200),
    });
    res.json({ logs });
  } catch (e) { next(e); }
});

module.exports = router;
