import express from 'express';
import config from './config/config';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './utils/auth';
const app = express();

app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(config.port, () => {
  console.log(`Hello, I am listening on port ${config.port}`);
});
