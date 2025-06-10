const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    default: () => Date.now(),
  },
  product: [
    {
      productsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  totalPrice: Number,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
