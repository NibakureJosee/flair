const express = require('express');
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// Example database of users with biographies


// GET route to get the biography of a user by ID
exports.getBiography= async(req,res)=> {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
const users = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.send(user.bio);
};

// PUT route to update the biography of a user by ID
exports.updateBio= (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.bio = req.body.bio;
  res.send('Biography updated successfully');
};

module.exports = router;
