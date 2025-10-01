import pino from 'pino';

const logger = pino({
  level: 'warn',
  transport: {
    target: 'pino-pretty', // makes logs human-readable
  },
});
export default logger;
