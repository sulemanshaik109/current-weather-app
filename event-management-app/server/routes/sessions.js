const express = require('express');
const Session = require('../models/Session');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

router.get('/sessions', authenticateToken, async (req, res) => {
  try {
    const sessions = await Session.findAll({ where: { UserId: req.user.id } });
    res.json({ sessions });
  } catch (error) {
    res.status(400).json({ error: 'Failed to retrieve sessions' });
  }
});

module.exports = router;
