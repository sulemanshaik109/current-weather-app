const express = require('express');
const BlogPost = require('../models/blogPost');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create Post
router.post('/', authMiddleware(['admin', 'author']), async (req, res) => {
  try {
    const post = await BlogPost.create({ ...req.body, authorId: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Post
router.put('/:id', authMiddleware(['admin', 'author']), async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.params.id);
    if (post.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await post.update(req.body);
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Post
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Search Posts
router.get('/search', async (req, res) => {
  const { q, author, status } = req.query;
  try {
    const where = {};
    if (q) where.title = { [Op.like]: `%${q}%` };
    if (author) where.authorId = author;
    if (status) where.status = status;

    const posts = await BlogPost.findAll({ where });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Top 5 Most Commented Posts
router.get('/top-comments', async (req, res) => {
  try {
    const posts = await sequelize.query(`
      SELECT p.id, p.title, COUNT(c.id) AS commentCount
      FROM BlogPosts p
      LEFT JOIN Comments c ON p.id = c.blogPostId
      GROUP BY p.id
      ORDER BY commentCount DESC
      LIMIT 5
    `, { type: QueryTypes.SELECT });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Number of Posts per Author
router.get('/posts-per-author', async (req, res) => {
  try {
    const authors = await sequelize.query(`
      SELECT a.username, COUNT(p.id) AS postCount
      FROM Users a
      LEFT JOIN BlogPosts p ON a.id = p.authorId
      GROUP BY a.id
    `, { type: QueryTypes.SELECT });
    res.json(authors);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
