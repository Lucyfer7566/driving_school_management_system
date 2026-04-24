const dotenv = require('dotenv');
// Load env ASAP
dotenv.config();

// Ensure Prisma Client uses a valid engine type for Node.js runtime
if (!process.env.PRISMA_CLIENT_ENGINE_TYPE || !['library', 'binary'].includes(process.env.PRISMA_CLIENT_ENGINE_TYPE)) {
  process.env.PRISMA_CLIENT_ENGINE_TYPE = 'library';
}

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

module.exports = { prisma };
