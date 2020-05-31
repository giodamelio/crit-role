import logger from '../../src/logger';

describe('Logger', () => {
  it('Does it log?', () => {
    expect.assertions(0);

    logger.info('Ya?');
  });
});
