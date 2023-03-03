const express = require('express');
const router = express.Router();
const Video = require('../models/stream');

// Route to get the number of videos posted by a user
exports.getStreams= async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count the number of videos posted by the user with the specified ID
    const streamCount = await stream.countDocuments({ userId });

    res.json({ count: streamCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


