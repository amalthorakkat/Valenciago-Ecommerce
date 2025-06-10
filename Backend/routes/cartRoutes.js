console.log("Cart routes loaded");
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/cart/:userId", cartController.addToCart);

router.get("/cart/:userId", cartController.getCart);

router.put("/cart/:userId", cartController.updateCartItem);

router.delete("/cart/:userId/:productId", cartController.removeFromCart);

module.exports = router;
