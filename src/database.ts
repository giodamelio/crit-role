import { promises as fs } from 'fs';

import Knex from 'knex';

import logger from './logger';

const db = Knex({
  client: 'sqlite',
  connection: { filename: ':memory:' },
  useNullAsDefault: true,
});

export async function setupDatabase(database: Knex = db): Promise<void> {
  logger.info('Setting up database');

  // Load the schemas from the file
  const schemasString = (await fs.readFile('data/schemas.sql')).toString();
  await database.raw(schemasString);

  // Load some data
  const peopleString = (await fs.readFile('data/people.json')).toString();
  const peopleData = JSON.parse(peopleString);
  await database.batchInsert('people', peopleData);
}

export default db;
