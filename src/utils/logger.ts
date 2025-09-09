import pino from 'pino';

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty', // makes logs human-readable
  },
});
export default logger;
