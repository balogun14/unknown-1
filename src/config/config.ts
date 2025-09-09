import dotenv from 'dotenv';

dotenv.config();

interface AppConfig {
  port: number;
  databaseUrl: string;
}
// FLW_CLIENT_ID="e6700b87-8c4a-4a72-8cdf-e6ab88f24dfc"
// FLW_CLIENT_SECRET="U1UBzt1NZMq39onUGZtdWL05iuFFmfVE"
// FLW_ENCRYPTION_KEY="Z8ksVDnqf0fiYOxPL5otHlRZs5qOfJgiJmem8xvqO0E="

function loadConfig(): AppConfig {
  const port = parseInt(process.env.PORT ?? '3000', 10);
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('Missing important environment variables');
  }
  return {
    port,
    databaseUrl,
  };
}

const config = loadConfig();

export default config;
