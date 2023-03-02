// Import the required modules and models
const express = require('express');
const Post = require('../models/post.model');

// Create an instance of the router
const router = express.Router();

exports.getPosts=  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Define the API endpoint to get the number of posts on a user's profile
  exports.numberOfPosts= async (req, res) => {
    try {
      const userId = req.params.userId;
      const count = await Post.countDocuments({ user: userId });
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  

// Export the router
module.exports = router;
