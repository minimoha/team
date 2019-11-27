const express = require("express");
const router = express.Router();
const gifCtrl = require("../controllers/gif");

router.post("/gifs", gifCtrl.createGif);
router.delete("/gifs/:gifId", gifCtrl.deleteGif);
router.post("/gifs/:gifId/comment", gifCtrl.createGifComment);
router.get("/gifs/:gifId", gifCtrl.getOneGif);

module.exports = router;
