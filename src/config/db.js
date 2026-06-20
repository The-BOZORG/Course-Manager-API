import { Sequelize } from 'sequelize';
import colors, { bold } from 'colors';

export const dataBase = new Sequelize(
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
    await dataBase.authenticate();
    console.log(
      `Database connected: ${dataBase.config.host}:${dataBase.config.port}`.cyan
        .underline.bold,
    );
  } catch (error) {
    console.log('Unable to connect to the database'.red.underline.bold, error);

    process.exit(1);
  }
}
