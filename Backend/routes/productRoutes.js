
const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.get("/products/search", productController.searchProducts);
router.get("/products/:productId", productController.getProductById);
router.put("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);

module.exports = router;