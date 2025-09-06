import app from './app';
import config from './config/config';

app.listen(config.port, () => {
  console.log(`Hello, I am listening on port ${config.port}`);
});
