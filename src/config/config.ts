import dotenv from 'dotenv';

dotenv.config();

 interface Config {
  JWT_SECRET: string;
    JWT_EXPIRATION: string;
    PASSWORD_EMAIL: string;
    SMTP_EMAIL: string;
    EMAIL : string;

}

const config:Config = {
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',
  PASSWORD_EMAIL: process.env.PASSWORD_EMAIL || 'your_password_email',
  SMTP_EMAIL: process.env.SMTP_EMAIL || 'your_smtp_email',
  EMAIL: process.env.EMAIL || 'your_email',

}
export default config;