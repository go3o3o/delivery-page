import * as path from 'path';
import * as express from 'express';
import * as http from 'http';
import * as cors from 'cors';
import { createConnection } from 'typeorm';

import { dbConf } from './config';
import logger from './logger';

import authRouter from './routes/auth';
import categoryRouter from './routes/category';

const stopServer = async (server: http.Server) => {
  await server.close();
  process.exit();
};

async function runServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use('/auth', authRouter);
  app.use('/category', categoryRouter);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  const server = app.listen(8000, () => {
    logger.debug('Example app listening on port 8000!');
  });

  await createConnection({
    type: 'mysql',
    host: dbConf.HOST,
    port: dbConf.PORT,
    username: dbConf.USERNAME,
    password: dbConf.PASSWORD,
    database: dbConf.DATABASE,
  })
    .then(async connection => {
      logger.debug('Connected to DB');
    })
    .catch(error => {
      logger.error('TypeORM connection error: ', error);
      stopServer(server);
    });
}

runServer()
  .then(() => {
    logger.info('run succesfully');
  })
  .catch((ex: Error) => {
    logger.error('Unable run:', ex);
  });
