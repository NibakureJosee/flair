// Import necessary modules and models
const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

// Endpoint to get followers and those a user is following
exports.getFollowers= async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's followers and following lists
    const user = await User.findById(userId).populate('followers').populate('following');

    // Return the followers and following lists as response
    res.status(200).json({ followers: user.followers, following: user.following });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

module.exports = router;
