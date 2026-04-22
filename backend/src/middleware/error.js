const { handlePrismaError, sendError } = require('../utils/api');

function errorHandler(err, req, res, _next) {
  console.error('Error:', err);
  if (res.headersSent) return;
  if (handlePrismaError(err, res)) return;
  const status = err.status || 500;
  sendError(res, status, err.code || 'INTERNAL_SERVER_ERROR', err.message || 'Internal Server Error');
}

module.exports = errorHandler;
