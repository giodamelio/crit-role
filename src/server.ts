import setupServer from './index';
import rootLogger from './logger';

setupServer()
  .then((app) => {
    app.listen(3141);
    rootLogger.info('App running on port: 3141');
  })
  .catch((error) => {
    rootLogger.fatal(
      { step: 'unhandled-error', error },
      'Unhandled error: %s',
      error.message,
    );
    process.exit(1);
  });
