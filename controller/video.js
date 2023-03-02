const express = require('express');
const router = express.Router();
const Video = require('../models/video.model');

// Route to get the number of videos posted by a user
exports.getVideos= async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count the number of videos posted by the user with the specified ID
    const videoCount = await Video.countDocuments({ userId });

    res.json({ count: videoCount });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};


