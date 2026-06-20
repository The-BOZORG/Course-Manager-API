import app from './index.js';
import { connectToDatabase } from './config/db.js';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`.green.bold);
  });
}

bootstrap();
