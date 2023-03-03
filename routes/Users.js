const express = require ("express");
const {
  update,
  deleteUser,
  getUser,
  follow,
  unfollow,
  getFollowers,
  getUser,
  postUser,
  loginUser,
  updateUsername,
  updatePassword,
  logoutUser,
  getBiography,
  updateBio,
} = require ("../controllers/User.js");
const { verifyToken } = require ("../verifyToken.js");

const router = express.Router();

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//get followers and followings
router.get("/followers", getFollowers)


//follow a user
router.put("/foll/:id", verifyToken, follow);

//unfollow a user
router.put("/unfoll/:id", verifyToken, unfollow);

router.get('/users', getUser);
router.post('/register',postUser);
router.post('/login', loginUser);
router.put('/:id/username',  updateUsername);
router.put('/:id/password', updatePassword);
router.post('/logout', logoutUser)
router.get(":id/bio",getBiography )
router.put(":id/bio", updateBio)


module.exports = router;

