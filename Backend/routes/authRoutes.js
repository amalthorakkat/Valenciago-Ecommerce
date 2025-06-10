const express = require("express");
const authController = require("../controllers/authControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddlewares.verifyToken,authController.me);
router.delete("/logout",authController.logout)

module.exports = router;
