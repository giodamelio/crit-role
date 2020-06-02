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
      expect.assertions(0);

      await request
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8');
    });
  });
});
