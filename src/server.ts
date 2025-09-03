import express from 'express';
import config from './config/config';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(config.port, () => {
  console.log(`Hello, I am listening on port ${config.port}`);
});
