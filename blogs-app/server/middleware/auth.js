const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'No token provided' });

      const decoded = jwt.verify(token, 'your_jwt_secret');
      req.user = await User.findByPk(decoded.id);

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
