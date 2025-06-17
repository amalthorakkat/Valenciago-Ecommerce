
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: { 
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  sizes: { 
    type: [String],
    default: [],
  },
  stock: { 
    type: Number,
    required: true,
    min: 0,
  },
  material: { 
    type: String,
    default: "",
  },
  brand: { 
    type: String,
    default: "",
  },
  price: {
    original: {
      type: Number,
      required: true,
    },
    discounted: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: String,
      default: "0%",
    },
  },
  reviews: [ 
    {
      user: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  shippingInfo: { 
    freeShipping: {
      type: Boolean,
      default: false,
    },
    estimatedDelivery: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);