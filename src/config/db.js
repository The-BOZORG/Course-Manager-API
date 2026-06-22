import { logger } from '../utils/logger.js';
import { Sequelize } from 'sequelize';
import colors from 'colors';

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
      `🟢 Database connected: ${sequelize.config.host}:${sequelize.config.port}`
        .cyan.underline.bold,
    );
  } catch (error) {
    logger.warn('Unable to connect to the database'.red.underline.bold, error);

    process.exit(1);
  }
}

export async function disconnectDatabase() {
  try {
    await sequelize.close();
    logger.info(' Database connection closed'.yellow.bold);
  } catch (error) {
    logger.warn(' Error while closing database connection'.red.bold, error);
  }
}
