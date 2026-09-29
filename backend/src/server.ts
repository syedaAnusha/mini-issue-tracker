import { app } from './app.js';
import { config } from './config/index.js';
import { logger } from './lib/logger.js';
import { prisma } from './lib/prisma.js';

const server = app.listen(config.PORT, config.HOST, () =>
  logger.info('HTTP server started', { host: config.HOST, port: config.PORT }),
);

function shutdown(signal: string): void {
  logger.info('Shutdown requested', { signal });
  server.close(() => void prisma.$disconnect().finally(() => process.exit(0)));
}

process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));
server.on('error', (error) => {
  logger.error('HTTP server failed to start', { error: error.message });
  process.exitCode = 1;
});
