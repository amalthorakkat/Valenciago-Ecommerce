const express = require("express");

const orderControllers = require("../controllers/orderControllers");
const { verifyToken } = require("../middlewares/authMiddlewares");
const { verify } = require("jsonwebtoken");

const router = express.Router();

router.post("/orders", verifyToken, orderControllers.createOrder);
router.get("/orders", verifyToken, orderControllers.allOrders);

module.exports = router;
