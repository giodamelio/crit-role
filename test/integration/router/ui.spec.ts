import supertest, { SuperTest, Test } from 'supertest';

import db from '../../../src/database';

// Test subject
import setupServer from '../../../src/index';

describe('Router', () => {
  describe('debug', () => {
    let request: SuperTest<Test>;
    beforeAll(async () => {
      const server = await setupServer();
      request = supertest.agent(server.callback());
    });

    afterAll(async () => {
      await db.destroy();
    });

    it('should list the tables', () => {
      expect.assertions(0);

      return request
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('Hello World');
    });
  });
});
