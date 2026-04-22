const { sendError } = require('../utils/api');

function requireRole(...roles) {
  return (req, res, next) => {
    const role = req.currentUser?.role || req.user?.role;
    if (!role) return sendError(res, 401, 'UNAUTHORIZED', 'Unauthorized');
    if (!roles.includes(role)) return sendError(res, 403, 'FORBIDDEN', 'Forbidden: insufficient role');
    next();
  };
}

module.exports = { requireRole };
