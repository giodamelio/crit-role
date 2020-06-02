import { promises as fs } from 'fs';

import Knex from 'knex';

// Test subject
import db, { setupDatabase } from '../../src/database';

describe('database', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('sets up the database', async () => {
    expect.assertions(2);

    await setupDatabase();

    expect(db).toBeDefined();
    // Ensure there is a `people` table
    await expect(
      db.raw(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='people'",
      ),
    ).resolves.toHaveLength(1);
  });

  // This is a hack to keep the local.db up to date
  it('write the local.db', async () => {
    expect.assertions(0);

    // Delete the database file unless it doesn't exist
    try {
      await fs.unlink('data/local.db');
    } catch (err) {
      // We want to rethrow all errors unless it is a files does not exist error
      // eslint-disable-next-line jest/no-if
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    const localDb = Knex({
      client: 'sqlite',
      connection: { filename: 'data/local.db' },
      useNullAsDefault: true,
    });

    await setupDatabase(localDb);
    await localDb.destroy();
  });
});
