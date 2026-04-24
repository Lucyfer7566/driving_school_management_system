const { Prisma } = require('@prisma/client');

function errorResponse(code, message) {
  return { error: { code, message } };
}

function sendError(res, status, code, message) {
  return res.status(status).json(errorResponse(code, message));
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parsePagination(query, defaults = { skip: 0, take: 20, maxTake: 100 }) {
  const skip = Number(query.skip ?? 0);
  const take = Number(query.take ?? defaults.take);

  return {
    skip: Number.isInteger(skip) && skip >= 0 ? skip : defaults.skip,
    take: Number.isInteger(take) && take > 0 ? Math.min(take, defaults.maxTake) : defaults.take,
  };
}

function formatValidationErrors(result) {
  return result.error.issues.map((issue) => issue.message).join(', ');
}

function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return safeUser;
}

function handlePrismaError(err, res) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : 'resource';
      return sendError(res, 409, 'CONFLICT', `${target} already exists`);
    }
    if (err.code === 'P2025') {
      return sendError(res, 404, 'NOT_FOUND', 'Resource not found');
    }
  }
  return null;
}

module.exports = {
  errorResponse,
  sendError,
  parseId,
  parsePagination,
  formatValidationErrors,
  sanitizeUser,
  handlePrismaError,
};
