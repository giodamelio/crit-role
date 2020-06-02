import { promises as fs } from 'fs';

import Knex from 'knex';

import rootLogger from './logger';

const db = Knex({
  client: 'sqlite',
  connection: { filename: ':memory:' },
  useNullAsDefault: true,
});

db.on('query', (queryInfo) => {
  rootLogger.trace({ step: 'knex-query', queryInfo });
});

let alreadySetup = false;
export async function setupDatabase(database: Knex = db): Promise<void> {
  // Make sure the setup only happens once
  if (alreadySetup) {
    return;
  }
  alreadySetup = true;

  rootLogger.info({ step: 'database-setup' }, 'Setting up database');

  // Load the schemas from the file
  const schemasString = (await fs.readFile('data/schemas.sql')).toString();
  await database.raw(schemasString);

  // Load some data
  const peopleString = (await fs.readFile('data/people.json')).toString();
  const peopleData = JSON.parse(peopleString);
  await database.batchInsert('people', peopleData);
}

export default db;
