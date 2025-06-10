const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryControllers");

router.get("/:category", categoryControllers.getProductsByCategory );

module.exports = router;
