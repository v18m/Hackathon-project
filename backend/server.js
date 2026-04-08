const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log incoming requests to show transparent PQC headers if present
app.use((req, res, next) => {
  console.log(`[Backend] Received ${req.method} request to ${req.url}`);
  if (req.headers['x-pqc-secured']) {
    console.log(`[Backend] Detected PQC headers - Signature: ${req.headers['x-pqc-signature'].substring(0, 25)}...`);
  }
  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`[Backend] Server running on port ${PORT}`);
});
