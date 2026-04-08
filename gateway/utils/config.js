const path = require('path');

module.exports = {
  GATEWAY_PORT: process.env.GATEWAY_PORT || 4433,
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
  CERTS_DIR: path.join(__dirname, '../certs'),
  LOG_DIR: path.join(__dirname, '../../logs'),
};
