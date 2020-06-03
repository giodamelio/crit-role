import setupServer from './index';
import rootLogger from './logger';

const PORT = process.env.PORT || 3141;

setupServer()
  .then((app) => {
    app.listen(PORT);
    rootLogger.info(`App running on port: ${PORT}`);
  })
  .catch((error) => {
    rootLogger.fatal(
      { step: 'unhandled-error', error },
      'Unhandled error: %s',
      error.message,
    );
    process.exit(1);
  });
