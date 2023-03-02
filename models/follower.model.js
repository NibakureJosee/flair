const mongoose = require('mongoose');

const FollowersSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Followers = mongoose.model('Followers', FollowersSchema);

module.exports = Followers;
