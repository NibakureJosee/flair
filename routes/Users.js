const express = require ("express");
const {
  update,
  deleteUser,
  getUser,
  follow,
  unfollow,
  like,
  dislike,
} = require ("../controllers/User.js");
const { verifyToken } = require ("../verifyToken.js");

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//follow a user
router.put("/foll/:id", verifyToken, follow);

//unfollow a user
router.put("/unfoll/:id", verifyToken, unfollow);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

module.exports = router;

