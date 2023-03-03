const { createError } = require ("../error.js");
const User = require ("../models/User.js");
const Video = require ("../models/Video.js");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { json } = require("express");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require('google-auth-library');
const admin = require('firebase-admin');


module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.postUser=async (req,res)=>{
    console.log(req.body);
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      if (user) {
        user.save();
        res.json({ status: "ok" });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error:error });
    }
  };
  
  exports.loginUser= async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
          return res
            .status(400)
            .json({ status: "error", message: "No User found with that email" });
        }
      const passwordValid = bcrypt.compare(req.body.password, req.body.password);
      if (!passwordValid) {
        return res
          .status(400)
          .json({ status: "error", message: "No User found" });
      }
      if (passwordValid) {
        const token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            password: user.password,
          },
          "secret123"
        );
        return res.json({ status: "ok", user: token });
      } else {
        return res.json({ status: "error", user: false });
      }
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  };

  exports.updateUsername= async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
  
    try {
      // Find user by ID
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update username
      user.username = username;
      await user.save();
  
      // Send response
      res.json({ message: 'Username updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updatePassword= async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
  
    try {
      // Find user by ID
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Hash new password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update password
      user.password = hashedPassword;
      await user.save();
  
      // Send response
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  // Logout route
  exports.logoutUser= (req, res) => {
    // Invalidate user's session token or cookie, or clear any relevant user data stored on the client-side.
    
    // Send success response
    res.status(200).json({ message: 'Logout successful.' });
  };



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

exports.getFollowers= async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('followers').populate('following');
    res.status(200).json({ followers: user.followers, following: user.following });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// GET route to get the biography of a user by ID
exports.getBiography= async(req,res)=> {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
const users = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  const user = User.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.send(user.bio);
};

// PUT route to update the biography of a user by ID
exports.updateBio= (req, res) => {
  const user = User.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.bio = req.body.bio;
  res.send('Biography updated successfully');
};




