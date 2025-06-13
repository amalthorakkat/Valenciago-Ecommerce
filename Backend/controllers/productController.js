const Product = require("../models/productModels");

module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "product fetched successfully!", products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error", error: error.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product fetched successfully!", product });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching products!", error: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  try {
    const productDetails = req.body;
    const newProduct = new Product(productDetails);
    console.log(productDetails);
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Product created successfully!", newProduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Products fetch failed", error: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, category, price, stock } = req.body;
    const product = await Product.findOne({ _id: productId });

    product.productName = productName ? productName : product.productName;
    product.category = category ? category : product.category;
    product.price = price ? price : product.price;
    product.stock = stock ? stock : product.stock;

    const updateProduct = await product.save();
    res
      .status(200)
      .json({ message: "Products updates successfully", updateProduct });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Products updation failed! ", error: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(200).json({
        message: "Product deletion failed!!!! No book d=found with this id ",
      });
    }

    res.status(200).json({ message: "product deleted " });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Product deletion failed", error: error.message });
  }
};
