import * as dotenv from 'dotenv';

import { ConnectionOptions } from 'typeorm';

import { Member } from './entities/Member';
import { Store } from './entities/Store';
import { Category } from './entities/Category';
import { Order } from './entities/Order';
import { Review } from './entities/Review';
import { Menu } from './entities/Menu';

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

export let dbOptions: ConnectionOptions = {
  type: 'mysql',
  name: 'delivery',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Member, Category, Store, Menu, Order, Review],
};

export const authConf = {
  AUTH_KEY: process.env.AUTH_KEY,
};
