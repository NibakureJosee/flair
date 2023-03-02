const express=require('express');
const router = express.Router();
const{ getPosts}=require('../controller/post');
const {numberOfPosts}=require('../controller/post');
const Post = require('../models/post.model');


// router.get('/posts/:id',getPosts);
router.get('/users/:userId/posts/count', async (req, res) => {
    try {
      const userId = req.params.userId;
      const count = await Post.countDocuments({ user: userId });
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });

module.exports = router;