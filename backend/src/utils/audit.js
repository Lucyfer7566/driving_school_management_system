const { prisma } = require('../lib/prisma');

async function audit({ userId = null, action, resource, ipAddress = null, status = 'SUCCESS' }) {
  try {
    await prisma.auditLog.create({
      data: { userId, action, resource, ipAddress, status },
    });
  } catch (e) {
    console.error('Failed to write audit log', e);
  }
}

function auditMiddleware(actionBuilder) {
  return async (req, res, next) => {
    res.on('finish', async () => {
      try {
        const { action, resource } = typeof actionBuilder === 'function' ? actionBuilder(req) : actionBuilder || {};
        if (!action || !resource) return;
        await audit({
          userId: req.currentUser?.id || req.user?.id || null,
          action,
          resource,
          ipAddress: req.ip,
          status: res.statusCode >= 400 ? 'FAILURE' : 'SUCCESS',
        });
      } catch (e) {
        console.error('Audit middleware error', e);
      }
    });
    next();
  };
}

module.exports = { audit, auditMiddleware };
