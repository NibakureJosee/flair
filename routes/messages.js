const express = require ("express");
const { getMessages, addMessage } = require ("../controllers/messageController.js");
const router = express.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
