const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Session = sequelize.define('Session', {
  loginTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  logoutTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

Session.belongsTo(User);
User.hasMany(Session);

module.exports = Session;
