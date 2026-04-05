const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: require('../../package.json').version,
  });
});

router.get('/ready', (_req, res) => {
  res.json({ ready: true });
});

module.exports = router;
