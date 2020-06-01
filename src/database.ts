import { promises as fs } from 'fs';

import Knex from 'knex';

import logger from './logger';

const db = Knex({
  client: 'sqlite',
  connection: { filename: ':memory:' },
  useNullAsDefault: true,
});

export async function setupDatabase(): Promise<void> {
  logger.info('Setting up database');

  // Load the schemas from the file
  const schemasString = (await fs.readFile('data/schemas.sql')).toString();
  await db.raw(schemasString);
}

export default db;
