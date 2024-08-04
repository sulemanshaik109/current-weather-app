const express = require('express');
const Comment = require('../models/Comment');
const BlogPost = require('../models/blogPost');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create Comment
router.post('/', authMiddleware(['reader']), async (req, res) => {
  try {
    const post = await BlogPost.findByPk(req.body.post);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ ...req.body, authorId: req.user.id });
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Approve Comment (admin only)
router.patch('/:id/approve', authMiddleware(['admin']), async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    await comment.update({ approved: true });
    res.json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
