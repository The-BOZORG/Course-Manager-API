import app from './index.js';
import { logger } from './utils/logger.js';
import { connectToDatabase, disconnectDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectToDatabase();

  const server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });

  process.on('SIGINT', async () => {
    logger.warn('Shutting down...');

    await disconnectDatabase();

    server.close(() => {
      logger.warn('Server closed');
      process.exit(0);
    });
  });
}

bootstrap();
