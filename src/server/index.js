/* eslint-disable global-require */

'use strict';

const http = require('http');

const environmentLoader = require('./config/environment');
const logLoader = require('./config/log');
const initialization = require('./config/initialization');
const securityLoader = require('./config/security');
// const routesLoader = require('./routes');

module.exports = {
  listen: async app => {
    environmentLoader(process.env.NODE_ENV);

    logLoader();

    initialization();

    securityLoader.passport();

    // routesLoader(app);

    console.info(`Port : ${process.env.PORT || 3000}`);
    console.info(`NODE_ENV : ${process.env.NODE_ENV || 'local'}`);

    const server = http.createServer(app);

    server.on('clientError', err => {
      console.error(err);
    });

    server.listen(Number(process.env.PORT || 3002), '0.0.0.0', () => {
      console.info(
        `Server is running on: http://${server.address().address}:${process.env.PORT || 3002}`
      );

      console.info(
        `Swagger-UI is running on: http://${server.address().address}:${process.env.PORT ||
        3002}/explorer`
      );
      console.info('To shut down, press <CTRL> + C at any time.');
    });
  }
};