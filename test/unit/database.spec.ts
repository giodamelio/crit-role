import db, { setupDatabase } from '../../src/database';

describe('Database', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('Sets up the database', async () => {
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
});
