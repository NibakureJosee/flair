const mongoose = require ("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    followers: {
      type: Number,
      default: 0,
    },
    followings: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
