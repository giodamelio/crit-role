import logger from '../../src/logger';

describe('logger', () => {
  it('does it log?', () => {
    expect.assertions(0);

    logger.info('Ya?');
  });
});
