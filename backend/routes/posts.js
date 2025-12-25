const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.post(
  '/',
  protect,
  upload.single('image'),
  [
    body('content')
      .trim()
      .notEmpty()
      .withMessage('Post content is required')
      .isLength({ max: 1000 })
      .withMessage('Post content cannot exceed 1000 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { content } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;

      const post = await Post.create({
        author: req.user.id,
        content,
        image,
      });

      await post.populate('author', 'username avatar');

      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        data: { post },
      });
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while creating post',
      });
    }
  }
);

router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'username avatar')
      .populate('likes', 'username avatar');

    const total = await Post.countDocuments();

    res.json({
      success: true,
      data: {
        posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalPosts: total,
          hasMore: skip + posts.length < total,
        },
      },
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching posts',
    });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username avatar bio')
      .populate('likes', 'username avatar');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.json({
      success: true,
      data: { post },
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching post',
    });
  }
});

router.put(
  '/:id',
  protect,
  upload.single('image'),
  [
    body('content')
      .optional()
      .trim()
      .isLength({ max: 1000 })
      .withMessage('Post content cannot exceed 1000 characters'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const post = await Post.findById(req.params.id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found',
        });
      }

      if (post.author.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this post',
        });
      }

      if (req.body.content) {
        post.content = req.body.content;
      }

      if (req.file) {
        post.image = `/uploads/${req.file.filename}`;
      }

      await post.save();
      await post.populate('author', 'username avatar');

      res.json({
        success: true,
        message: 'Post updated successfully',
        data: { post },
      });
    } catch (error) {
      console.error('Update post error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating post',
      });
    }
  }
);

router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting post',
    });
  }
});

router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const isLiked = post.likes.includes(req.user.id);

    if (isLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user.id
      );
      await post.save();

      res.json({
        success: true,
        message: 'Post unliked',
        data: { liked: false, likesCount: post.likes.length },
      });
    } else {
      post.likes.push(req.user.id);
      await post.save();

      res.json({
        success: true,
        message: 'Post liked',
        data: { liked: true, likesCount: post.likes.length },
      });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking post',
    });
  }
});

module.exports = router;

