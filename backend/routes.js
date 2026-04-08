const express = require('express');
const router = express.Router();

router.get('/api/data', (req, res) => {
  res.json({
    status: 'success',
    message: 'This is sensitive data from the backend, secured by PQC gateway on transit.',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
