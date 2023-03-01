const express = require ("express");
const { addComment, deleteComment, getComments } = require ("../controllers/Comment.js");
const {verifyToken} = require ("../verifyToken.js");
const router = express.Router();

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

module.exports = router;
