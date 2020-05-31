import pino from 'pino';

export default pino({
  // Pretty print when not in production
  prettyPrint: process.env.NODE_ENV !== 'production',

  // Disable logger in test
  enabled: process.env.NODE_ENV !== 'test',
});
