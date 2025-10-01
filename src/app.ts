import express, { Application } from 'express';
import routes from './routes';
import pinoHttp from 'pino-http';
import logger from './utils/logger';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { rateLimit } from 'express-rate-limit';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    info: {
      title: 'Event ticketing Express API with Swagger',
      version: '1.0.0',
      description:
        'An CRUD app to book event tickets made in express and documented \
        with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/features/**/*.ts'],
};

const specs = swaggerJSDoc(swaggerOptions);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,
});
const app: Application = express();
app.use(
  pinoHttp({
    logger,
  })
);

app.use(limiter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

app.use('/api', routes);

export default app;
