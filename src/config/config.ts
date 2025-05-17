import dotenv from 'dotenv';

dotenv.config();

 interface Config {
  JWT_SECRET: string;
    JWT_EXPIRATION: string;
}

const config:Config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h'
}
export default config;