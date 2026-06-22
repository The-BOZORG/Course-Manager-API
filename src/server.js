import app from './index.js';
import { logger } from './utils/logger.js';
import { connectToDatabase, disconnectDatabase } from './config/db.js';
import colors from 'colors';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectToDatabase();

  const server = app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`.green.bold);
  });

  process.on('SIGINT', async () => {
    logger.warn('Shutting down...'.yellow.bold);

    await disconnectDatabase();

    server.close(() => {
      logger.info('Server closed'.green.bold);
      process.exit(0);
    });
  });
}

bootstrap();
