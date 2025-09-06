import express, { Application } from 'express';
import routes from './routes';
import pinoHttp from 'pino-http';
import logger from './utils/logger';

const app: Application = express();
app.use(
  pinoHttp({
    logger,
  })
);

app.use(express.json());

app.use('/api', routes);

export default app;
