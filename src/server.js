import app from './index.js';
import { connectToDatabase, disconnectDatabase } from './config/db.js';
import colors from 'colors';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectToDatabase();

  const server = app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`.green.bold);
  });

  process.on('SIGINT', async () => {
    console.log('\n⚠️ Shutting down...'.yellow.bold);

    await disconnectDatabase();

    server.close(() => {
      console.log('✓ Server closed'.green.bold);
      process.exit(0);
    });
  });
}

bootstrap();
