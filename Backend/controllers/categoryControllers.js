const Product = require("../models/productModels");

module.exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category
    const products = await Product.find({ category: category});
    res
      .status(200)
      .json({ message: " products fetched by category successfully ", products });
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
};

