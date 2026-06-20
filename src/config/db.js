import { Sequelize } from 'sequelize';

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
