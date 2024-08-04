const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'author', 'reader'),
    defaultValue: 'reader'
  }
}, { timestamps: true });

User.beforeSave(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

User.prototype.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

User.prototype.generateToken = function() {
  return jwt.sign({ id: this.id, role: this.role }, 'your_jwt_secret', { expiresIn: '1h' });
};

module.exports = User;
