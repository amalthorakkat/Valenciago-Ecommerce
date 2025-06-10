const express = require("express");
const posterController = require("../controllers/posterController");
const router = express.Router();

router.get("/posters", posterController.getAllPosters);
router.post("/posters", posterController.createPoster);

module.exports = router;
