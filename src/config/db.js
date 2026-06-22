import { logger } from '../utils/logger.js';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DIALECT || 'mysql',
    logging: false,
  },
);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    logger.info(
      `Database connected: ${sequelize.config.host}:${sequelize.config.port}`,
    );
  } catch (error) {
    logger.error('Unable to connect to the database', error);

    process.exit(1);
  }
}

export async function disconnectDatabase() {
  try {
    await sequelize.close();
    logger.warn('Database connection closed');
  } catch (error) {
    logger.error('Error while closing database connection', error);
  }
}
