import { logger } from '../utils/logger.js';
import { sequelize } from './db.js';
import { migrator } from './migrator.js';

async function rollback() {
  try {
    await sequelize.authenticate();

    const migration = await migrator.down();

    logger.info(`Rolled back: ${migration?.name}`);

    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
rollback();
