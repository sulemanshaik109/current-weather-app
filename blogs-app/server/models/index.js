const sequelize = require('../config/database');
const User = require('./user');
const BlogPost = require('./blogPost');
const Comment = require('./Comment');

// Sync all models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = { User, BlogPost, Comment };
