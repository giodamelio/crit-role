import Knex from 'knex';

import logger from './logger';

const db = Knex({
  client: 'sqlite',
  connection: { filename: ':memory:' },
  useNullAsDefault: true,
});

export async function setupDatabase(): Promise<void> {
  logger.info('Setting up database');

  // Create `people` table
  await db.schema.createTable('people', (table) => {
    table.string('name');
  });
}

export default db;
