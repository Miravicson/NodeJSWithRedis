// @flow

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import redis from 'redis';
import type { $Request, $Response, NextFunction, $Application } from 'express';
import logger from './utils/logger';
import config from './config';
import * as routes from './modules';

/**
 *
 * @param {*} decorators - An array of middleware decorators to setup the application. The order of the decorators matters. its typical to setup general middleware, followed by routes and the error handlers
 * @param {*} expressApp - express application instance
 */
const composeApp = (decorators, expressApp) => decorators.reduce((app, decorator) => decorator(app), expressApp);

const middlewareDecorator = (app: $Application<$Request, $Response>) => {
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  return app;
};

const errorHandlerDecorator = (app: $Application<$Request, $Response>) => {
  app.use('/', (req: $Request, res: $Response, next: NextFunction) => {
    const error: any = new Error('Not found');
    error.message = 'Invalid route or Invalid Method For the Route';
    error.status = 404;
    logger.error(`${req.method}: ${req.path}:=>  ${error.message}`);
    next(error);
  });
  app.use('/', (error: any, req: $Request, res: $Request, next: NextFunction) => {
    res.status(error.status || 500);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

  return app;
};

const routesDecorator = app => {
  app.use('/', routes.starWarsRoutes);
  app.get('/', (req, res) => {
    res.send('Hello world!!');
  });
  return app;
};

const handleGracefulShutdown = (server: any) => {
  process.on('SIGTERM', () => {
    server.close(() => {
      process.exit(0);
    });
  });
};

const app = composeApp([middlewareDecorator, routesDecorator, errorHandlerDecorator], express());
const server = app.listen(config.serverPort, () => {
  // mongoose.connect(config.mongodbUrl, {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  // });
  // const db = mongoose.connection;
  // db.on('error', err => {
  //   logger.error(
  //     `Error connecting to DB: Ensure that you have a good network if you are connecting to a remote DB. Else run the command 'mongod' to stat the local mongodb database server`
  //   );
  //   process.exit(1);
  // });
  // db.once('open', () => {
  //   logger.info(`Application is listening on port: ${config.serverPort}`);
  // });
  logger.info(`Application is listening on port: ${config.serverPort}`);
});

handleGracefulShutdown(server);
