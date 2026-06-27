import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';

const migrationName = process.argv[2];

if (!migrationName) {
  logger.error('Please provide migration name');
  process.exit(1);
}

const timestamp = new Date()
  .toISOString()
  .replace(/[-:.TZ]/g, '')
  .slice(0, 14);

const fileName = `${timestamp}-${migrationName}.js`;

const filePath = path.join(process.cwd(), 'migrations', fileName);

const template = `export async function up({ context }) {

}

export async function down({ context }) {

}
`;

fs.writeFileSync(filePath, template);

logger.info(`Migration created: ${fileName}`);
