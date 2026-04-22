// --- DEBUG (optional, có thể giữ) ---
const originalExit = process.exit;
process.exit = function (code) {
  console.log('\n🚨 PHÁT HIỆN process.exit 🚨');
  console.trace('Call stack:');
  originalExit(code);
};

process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason) => {
  console.error('🔥 Unhandled Rejection:', reason);
});
// -----------------------------------

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const { prisma } = require('./lib/prisma');

dotenv.config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiter
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Velocity API is running' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/enrollments', require('./routes/enrollments'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/audit-logs', require('./routes/auditLogs'));

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./lib/swagger');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use(require('./middleware/error'));

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});

// ==================
// ✅ FIX QUAN TRỌNG
// ==================

// giữ event loop sống (debug)
setInterval(() => {}, 1000);

// xử lý shutdown chuẩn
const shutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}, shutting down...`);

  try {
    await prisma.$disconnect();

    server.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });

  } catch (err) {
    console.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
};

// Nodemon restart
process.once('SIGUSR2', () => shutdown('SIGUSR2'));

// Ctrl+C hoặc kill
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
