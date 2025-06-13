const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);
router.get("/products/:productId", productController.getProductById);

module.exports = router;
