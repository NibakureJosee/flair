const express = require ("express");
const { addVideo, addView, getByTag, getVideo, random, search, foll, trend, saveVideo } = require ("../controllers/Video.js");
const { verifyToken } = require ("../verifyToken.js");

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.post("/:id/save", verifyToken, saveVideo);
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/foll",verifyToken, foll)
router.get("/tags", getByTag)
router.get("/search", search)

module.exports = router;
