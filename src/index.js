/* eslint-disable no-console */
const cluster = require('cluster');

const CLUSTER_COUNT = 4;
if (cluster.isMaster) {
  for (let i = 0; i < CLUSTER_COUNT; i++) {
    cluster.fork();
  }
} else {
  const logger = require('./logger');
  const app = require('./app');
  const port = app.get('port');
  const server = app.listen(port);

  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );

  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
}
