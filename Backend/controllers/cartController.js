// const Cart = require("../models/cartModel");
// const Product = require("../models/productModels");

// module.exports.getCart = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     let cart = await Cart.findOne({ userId }).populate("items.productId");
//     if (!cart) {
//       cart = new Cart({ userId, items: [] });
//       await cart.save();
//     }
//     res.status(200).json(cart);
//   } catch (err) {
//     console.error("Cart fetching failed:", err);
//     res.status(500).json({ err: "Failed to get cart items" });
//   }
// };

// exports.addToCart = async (req, res) => {
//   const { userId } = req.params;
//   const { productId, quantity, price } = req.body;

//   console.log(price);

//   try {
//     const product = await Product.findById(productId);

//     console.log(product);
//     if (!product) return res.status(404).json({ error: "Product not found" });

//     let cart = await Cart.findOne({ userId });

//     console.log(cart);

//     if (!cart) {
//       cart = new Cart({ userId });
//     }

//     const existingItem = cart.items.find(
//       (item) => item.productId === productId
//     );

//     if (existingItem) {
//       existingItem.quantity += quantity;
//     } else {
//       cart.items.push({ productId: productId, quantity, price: Number(price) });
//     }

//     cart.totalPrice = cart.items.reduce((acc, item) => {
//       console.log(item.price, item.quantity);
//       return acc + Number(item.price) || 0 * item.quantity;
//     }, 0);

//     await cart.save();
//     await cart.populate("items.productId");

//     console.log(cart);
//     // res.status(200).json(cart);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports.updateCartItem = async (req, res) => {
//   const { userId } = req.params;
//   const { productId, quantity } = req.body;

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     const item = cart.items.find(
//       (item) => item.product.toString() === productId
//     );

//     if (!item) {
//       return res.status(404).json({ error: "Item not found in cart" });
//     }

//     item.quantity = quantity;
//     await cart.save();
//     await cart.populate("items.productId");

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error updating cart item:", error);
//     res.status(500).json({ error: "Failed to update item" });
//   }
// };

// module.exports.removeFromCart = async (req, res) => {
//   const { userId, productId } = req.params;

//   try {
//     let cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     cart.items = cart.items.filter(
//       (item) => item.product.toString() !== productId
//     );

//     await cart.save();
//     await cart.populate("items.product");

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).json({ error: "Failed to remove item" });
//   }
// };


const Cart = require("../models/cartModel");
const Product = require("../models/productModels");

module.exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("Cart fetching failed:", err);
    res.status(500).json({ error: "Failed to get cart items" });
  }
};

exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, price } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: Number(price) });
    }

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Failed to update item" });
  }
};

module.exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item" });
  }
};