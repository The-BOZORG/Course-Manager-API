import { logger } from '../utils/logger.js';
import { sequelize } from './db.js';
import { migrator } from './migrator.js';

async function migrate() {
  try {
    await sequelize.authenticate();

    const migrations = await migrator.up();

    logger.info('Migrations completed');

    migrations.forEach((migration) => {
      logger.info(`${migration.name}`);
    });

    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
migrate();
