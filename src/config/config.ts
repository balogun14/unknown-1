import dotenv from 'dotenv'

dotenv.config()

interface AppConfig{
  port: number;
  databaseUrl: string
}

function loadConfig(): AppConfig {
  const config = {
    port: parseInt(process.env.PORT?? '3000', 10),
    databaseUrl: process.env.DATABASE_URL!
  }

  if (!config.databaseUrl){
    throw new Error('Missing important environment variables')
  }
  return config
}


const config = loadConfig()

export default config