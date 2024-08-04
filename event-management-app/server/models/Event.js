const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./User');

const Event = sequelize.define('Event', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  weather: {
    type: DataTypes.JSON,
    allowNull: true
  }
});

Event.belongsTo(User);
User.hasMany(Event);

module.exports = Event;
