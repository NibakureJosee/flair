const{ getFollowers}=require('../controller/followers');
const router = require("express").Router();
const User=require('../models/follower.model');

router.get('/user/:userId/videos/count' , async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Get user's followers and following lists
      const user = await User.findById(userId).populate('follower').populate('following');
  
      // Return the followers and following lists as response
      res.status(200).json({ followers: user.follower, following: user.following });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });


module.exports = router;