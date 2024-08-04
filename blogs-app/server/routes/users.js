const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = user.generateToken();
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
