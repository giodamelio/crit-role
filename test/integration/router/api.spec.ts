import supertest, { SuperTest, Test } from 'supertest';

import db from '../../../src/database';

// Test subject
import setupServer from '../../../src/index';

describe('router', () => {
  describe('api', () => {
    let request: SuperTest<Test>;
    beforeAll(async () => {
      const server = await setupServer();
      request = supertest.agent(server.callback());
    });

    afterAll(async () => {
      await db.destroy();
    });

    it('should succesfully ping', async () => {
      expect.assertions(0);

      await request
        // Pong is important, ok?
        .get('/api/ping')
        .expect(200)
        .expect({ response: 'pong' });
    });

    it('should list the people', async () => {
      expect.assertions(1);

      await request
        .get('/api/people')
        .expect(200)
        .then((res) => {
          expect(res.body.people).toMatchSnapshot();
        });
    });
  });
});
