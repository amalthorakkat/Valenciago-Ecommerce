const Order = require("../models/orderModel")
module.exports.createOrder = async (req,res)=>{
    try {
        const {product ,totalPrice} = req.body;
        const order = new Order({
            user:req.user.id,
            product:product,
            totalPrice,

        })
        const newOrder = await order.save();
        res.status(201).json({message:"order placed",newOrder})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to create order",error:error.message})
    }
};

module.exports.allOrders = async (req,res)=>{
    try {
        const orders = await Order.find().populate('product').populate('user');
        res.status(200).json({message:"success",orders})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to get orders",error:error.message })
    }
}