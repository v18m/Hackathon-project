const express = require('express');
const createTLSServer = require('./tlsHandler');
const proxyMiddleware = require('./proxy');
const logger = require('./utils/logger');
const config = require('./utils/config');

const app = express();

// Intercept all requests and forward via reverse proxy
app.use('/', proxyMiddleware);

try {
  const server = createTLSServer(app);
  server.listen(config.GATEWAY_PORT, '0.0.0.0', () => {
    logger.info(`PQC Reverse Proxy Gateway is running and terminating TLS on port ${config.GATEWAY_PORT}`);
  });
} catch (e) {
  logger.error('Could not start server due to missing TLS setup.');
  process.exit(1);
}
