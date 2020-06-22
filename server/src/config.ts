import * as dotenv from 'dotenv';

let path;
switch (process.env.NODE_ENV) {
  case 'prod':
    path = path.join(__dirname, '../../.env.prod');
  case 'dev':
    path = `${__dirname}/../../.env.dev`;
  default:
    path = `${__dirname}/../../.env.dev`;
}
dotenv.config({ path: path });

export const dbConf = {
  HOST: process.env.DB_HOST,
  PORT: Number(process.env.DB_PORT),
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
};

export const authConf = {
  AUTH_KEY: process.env.AUTH_KEY,
};
