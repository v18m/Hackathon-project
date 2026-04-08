const https = require('https');
const fs = require('fs');
const path = require('path');
const config = require('./utils/config');
const logger = require('./utils/logger');

function createTLSServer(app) {
  try {
    const keyPath = path.join(config.CERTS_DIR, 'server.key');
    const certPath = path.join(config.CERTS_DIR, 'server.crt');
    
    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
        throw new Error('Certificates not found at ' + config.CERTS_DIR);
    }

    const options = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };
    logger.info('TLS certificates loaded successfully.');
    return https.createServer(options, app);
  } catch (error) {
    logger.error(`Failed to load TLS certificates: ${error.message}`);
    logger.warn('Please run the scripts/generateCerts.sh or generate them manually.');
    throw error;
  }
}

module.exports = createTLSServer;
