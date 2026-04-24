const jwt = require('jsonwebtoken');
const { prisma } = require('../lib/prisma');
const { sendError } = require('../utils/api');

async function authRequired(req, res, next) {
  const header = req.headers['authorization'];
  if (!header || !header.startsWith('Bearer ')) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Missing or invalid Authorization header');
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    if (payload?.id && payload?.sessionVersion) {
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: { sessionVersion: true, status: true },
      });
      if (!user) {
        return sendError(res, 401, 'UNAUTHORIZED', 'User not found');
      }
      if (user.status !== 'ACTIVE') {
        return sendError(res, 403, 'ACCOUNT_STATUS_INVALID', `Account is ${user.status.toLowerCase()}`);
      }
      if (user.sessionVersion !== payload.sessionVersion) {
        return sendError(res, 401, 'UNAUTHORIZED', 'Session is no longer valid');
      }
    }
    req.user = payload;
    next();
  } catch (e) {
    return sendError(res, 401, 'UNAUTHORIZED', 'Invalid or expired token');
  }
}

function optionalAuth(req, _res, next) {
  const header = req.headers['authorization'];
  if (header && header.startsWith('Bearer ')) {
    const token = header.slice(7);
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
      req.user = payload;
    } catch (_) {}
  }
  next();
}

async function attachUser(req, _res, next) {
  if (req.user?.id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
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
          updatedAt: true,
        },
      });
      req.currentUser = user;
    } catch (_) {}
  }
  next();
}

module.exports = { authRequired, optionalAuth, attachUser };
