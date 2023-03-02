const { getVideos } = require("../controller/video");
const router = require("express").Router();

router.get("/user/:userId/videos/count", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Count the number of videos posted by the user with the specified ID
    const videoCount = await Video.countDocuments({ userId });

    res.json({ count: videoCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
