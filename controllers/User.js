const { createError } = require ("../error.js");
const User = require ("../models/User.js");
const Video = require ("../models/Video.js");

module.exports.update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};

module.exports.deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.follow = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { followings: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { followers: 1 },
    });
    res.status(200).json("followed successfull.")
  } catch (err) {
    next(err);
  }
};

module.exports.unfollow = async (req, res, next) => {
  try {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { followings: req.params.id },
      });
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { followers: -1 },
      });
      res.status(200).json("Unfollwed successfull.")
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("The video has been liked.")
  } catch (err) {
    next(err);
  }
};

module.exports.dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("The video has been disliked.")
  } catch (err) {
    next(err);
  }
};
