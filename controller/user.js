const express = require("express");
const cors = require("cors");
const app = express();
const User = require("../models/user.model");
const Post=require('../models/post.model');
const jwt = require("jsonwebtoken");
const { json } = require("express");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require('google-auth-library');
const admin = require('firebase-admin');

// Route to get all registered users
exports.getUser= async (req, res) => {
  try {
    const users = await User.find(); // query the database for all users
    res.json(users); // return the users as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
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
  
  