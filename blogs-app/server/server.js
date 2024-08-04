const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, BlogPost, Comment } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
const blogPostRoutes = require('./routes/blogPosts');
const commentRoutes = require('./routes/comments');

app.use('/api/users', userRoutes);
app.use('/api/blogPosts', blogPostRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
