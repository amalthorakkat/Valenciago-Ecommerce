
const Cart = require("../models/cartModel");
const Product = require("../models/productModels");

module.exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    let cart = await Cart.findOne({ userId }).populate(
      "items.productId savedItems.productId"
    );
    if (!cart) {
      cart = new Cart({ userId, items: [], savedItems: [], totalPrice: 0 });
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error("Cart fetching failed:", err);
    res.status(500).json({ error: "Failed to get cart items" });
  }
};

module.exports.addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, price, size } = req.body; 

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (quantity > product.stock) {
      return res.status(400).json({ error: "Quantity exceeds stock" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], savedItems: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size 
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.price = Number(price);
    } else {
      cart.items.push({ productId, quantity, price: Number(price), size }); 
    }

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId savedItems.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, size } = req.body; 

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size 
    );

    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    const product = await Product.findById(productId);
    if (quantity > product.stock) {
      return res.status(400).json({ error: "Quantity exceeds stock" });
    }

    item.quantity = quantity;
    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId savedItems.productId");
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

    const wasInItems = cart.items.some(
      (item) => item.productId.toString() === productId
    );
    const wasInSaved = cart.savedItems.some(
      (item) => item.productId.toString() === productId
    );

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    cart.savedItems = cart.savedItems.filter(
      (item) => item.productId.toString() !== productId
    );

    if (!wasInItems && !wasInSaved) {
      return res.status(404).json({ error: "Item not found" });
    }

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId savedItems.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

module.exports.saveForLater = async (req, res) => {
  const { userId } = req.params;
  const { productId, size } = req.body; 

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size 
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    const [item] = cart.items.splice(itemIndex, 1);
    cart.savedItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      size: item.size, 
    });

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId savedItems.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error saving for later:", error);
    res.status(500).json({ error: "Failed to save item" });
  }
};

module.exports.moveToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, size } = req.body; 

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const itemIndex = cart.savedItems.findIndex(
      (item) => item.productId.toString() === productId && item.size === size 
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in saved items" });
    }

    const [item] = cart.savedItems.splice(itemIndex, 1);
    const existingItem = cart.items.find(
      (i) => i.productId.toString() === productId && i.size === size 
    );
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        size: item.size, 
      });
    }

    cart.totalPrice = cart.items.reduce((acc, item) => {
      return acc + (Number(item.price) * item.quantity || 0);
    }, 0);

    await cart.save();
    await cart.populate("items.productId savedItems.productId");
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error moving to cart:", error);
    res.status(500).json({ error: "Failed to move item" });
  }
};