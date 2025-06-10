

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    original: {
      type: String,
      required: true,
    },
    discounted: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: String,
      required: true,
    },
  },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
