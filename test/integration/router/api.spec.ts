import supertest, { SuperTest, Test } from 'supertest';

import db from '../../../src/database';

// Test subject
import setupServer from '../../../src/index';

describe('Router', () => {
  describe('api', () => {
    let request: SuperTest<Test>;
    beforeAll(async () => {
      const server = await setupServer();
      request = supertest.agent(server.callback());
    });

    afterAll(async () => {
      await db.destroy();
    });

    it('should succesfully ping', () => {
      expect.assertions(0);

      return (
        request
          // Pong is important, ok?
          .get('/api/ping')
          .expect(200)
          .expect({ response: 'pong' })
      );
    });

    it('should list the people', () => {
      expect.assertions(1);

      return request
        .get('/api/people')
        .expect(200)
        .then((res) => {
          expect(res.body.people).toMatchSnapshot();
        });
    });
  });
});
