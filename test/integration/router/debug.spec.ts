import supertest, { SuperTest, Test } from 'supertest';

import db from '../../../src/database';

// Test subject
import setupServer from '../../../src/index';

describe('router', () => {
  describe('debug', () => {
    let request: SuperTest<Test>;
    beforeAll(async () => {
      const server = await setupServer();
      request = supertest.agent(server.callback());
    });

    afterAll(async () => {
      await db.destroy();
    });

    it('should list the tables', async () => {
      expect.assertions(1);

      await request
        .get('/debug/tables')
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(`
            Object {
              "tables": Array [
                Object {
                  "name": "people",
                  "rootpage": 2,
                  "sql": "CREATE TABLE \`people\` (
              \`id\` TEXT,
              \`name\` TEXT
            )",
                  "tbl_name": "people",
                  "type": "table",
                },
              ],
            }
          `);
        });
    });
  });
});
