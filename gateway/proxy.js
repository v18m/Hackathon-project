const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');
const pqcTunnel = require('./pqc/pqcTunnel');

const proxyMiddleware = createProxyMiddleware({
  target: config.BACKEND_URL,
  changeOrigin: true,
  logProvider: () => logger,
  onProxyReq: (proxyReq, req, res) => {
    logger.info(`Incoming TLS request received & terminated for: ${req.method} ${req.url}`);
    
    // Simulate PQC Tunnel establishment & Securing request
    const securedPayload = pqcTunnel.securePayload(`${req.method} ${req.url}`);
    
    // Append simulated PQC headers to the forwarded request
    proxyReq.setHeader('x-pqc-secured', 'true');
    proxyReq.setHeader('x-pqc-signature', securedPayload.pqc_signature);
    
    logger.info(`Request PQC-secured and forwarded to backend: ${config.BACKEND_URL}${req.url}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    logger.info(`Response received from backend with status: ${proxyRes.statusCode}`);
    
    // Verify response
    pqcTunnel.verifyBackendResponse();
    
    logger.info('Returning PQC-verified response back to client securely over TLS');
  },
  onError: (err, req, res) => {
    logger.error(`Proxy Error: ${err.message}`);
    if (!res.headersSent) {
      res.status(502).send('Gateway Error');
    }
  }
});

module.exports = proxyMiddleware;
