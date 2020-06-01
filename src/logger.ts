import pino from 'pino';

const localLogFormatOptions = {
  translateTime: true,
  messageFormat: '[{step}] {msg}',
  ignore: 'hostname,pid',
};

export default pino({
  // Pretty print when not in production
  prettyPrint:
    process.env.NODE_ENV !== 'production' ? localLogFormatOptions : false,

  // Disable logger in test
  enabled: process.env.NODE_ENV !== 'test',
});
