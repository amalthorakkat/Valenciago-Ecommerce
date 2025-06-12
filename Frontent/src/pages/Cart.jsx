import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
  saveForLater,
  moveToCart,
} from "../features/cartSlice";
import MyLottieAnimation from "../components/lottie/cartLottie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, savedItems, totalPrice, status } = useSelector(
    (state) => state.cart
  );
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, user]);

  const handleIncrement = (productId, currentQuantity) => {
    if (user && user._id) {
      dispatch(
        updateCartItem({
          userId: user._id,
          productId,
          quantity: currentQuantity + 1,
        })
      );
    }
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1 && user && user._id) {
      dispatch(
        updateCartItem({
          userId: user._id,
          productId,
          quantity: currentQuantity - 1,
        })
      );
    }
  };

  const handleRemove = (productId) => {
    if (user && user._id) {
      dispatch(removeFromCart({ userId: user._id, productId }));
    }
  };

  const handleSaveForLater = (productId) => {
    if (user && user._id) {
      dispatch(saveForLater({ userId: user._id, productId }));
    }
  };

  const handleMoveToCart = (productId) => {
    if (user && user._id) {
      dispatch(moveToCart({ userId: user._id, productId }));
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
          <p className="text-gray-700 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const message =
    !items || items.length === 0
      ? "Your cart is empty."
      : "Your items are packed and ready";

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative bg-[#141414] overflow-hidden">
        <div className="relative z-10 flex items-center justify-center py-16 px-6">
          <div className="text-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-4 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-gray-300 text-lg font-medium">{message}</p>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/3 rounded-full blur-2xl"></div>
      </div>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {items && items.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div
                    key={item.productId._id}
                    className="p-6 sm:p-8 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-shrink-0 mx-auto lg:mx-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-40 h-40 object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-4 text-center lg:text-left">
                        <div>
                          <h2 className="text-xl font-bold text-black mb-2 leading-tight">
                            {item.productId.title}
                          </h2>
                          <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-300">
                            {item.productId.category}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                          <span className="text-2xl font-bold text-black">
                            ${item.price}
                          </span>
                          {item.productId.price.original && (
                            <span className="text-lg line-through text-gray-500">
                              ${item.productId.price.original}
                            </span>
                          )}
                          {item.productId.price.discountPercentage && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-black text-white">
                              {item.productId.price.discountPercentage}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center lg:justify-between flex-wrap gap-4">
                          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-300">
                            <button
                              onClick={() =>
                                handleDecrement(
                                  item.productId._id,
                                  item.quantity
                                )
                              }
                              className="w-8 h-8 flex cursor-pointer items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={item.quantity <= 1}
                            >
                              −
                            </button>
                            <span className="mx-4 font-bold text-black min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleIncrement(
                                  item.productId._id,
                                  item.quantity
                                )
                              }
                              className="w-8 cursor-pointer h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all duration-200 text-black font-semibold"
                            >
                              +
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                handleSaveForLater(item.productId._id)
                              }
                              className="inline-flex cursor-pointer items-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 text-sm"
                            >
                              Save for Later
                            </button>
                            <button
                              onClick={() => handleRemove(item.productId._id)}
                              className="inline-flex cursor-pointer items-center px-4 py-2 text-black font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm border border-gray-300"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-6 sm:p-8 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-black">
                      Order Summary
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {items.length} item{items.length !== 1 ? "s" : ""} in your
                      cart
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <span className="text-3xl font-bold text-black">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full cursor-pointer bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 text-lg shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-200">
              <div className="max-w-md mx-auto flex flex-col items-center ">
                <MyLottieAnimation />
                <h3 className="text-2xl font-bold text-black mt-6 mb-4">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any items to your cart yet. Start
                  shopping to fill it up!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex cursor-pointer items-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
          {savedItems && savedItems.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Saved for Later
                </h2>
                <div className="divide-y divide-gray-200">
                  {savedItems.map((item) => (
                    <div
                      key={item.productId._id}
                      className="py-6 flex flex-col lg:flex-row gap-6"
                    >
                      <div className="flex-shrink-0 mx-auto lg:mx-0">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-40 h-40 object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex-1 space-y-4 text-center lg:text-left">
                        <div>
                          <h3 className="text-xl font-bold text-black mb-2 leading-tight">
                            {item.productId.title}
                          </h3>
                          <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-300">
                            {item.productId.category}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                          <span className="text-2xl font-bold text-black">
                            ${item.price}
                          </span>
                          {item.productId.price.original && (
                            <span className="text-lg line-through text-gray-500">
                              ${item.productId.price.original}
                            </span>
                          )}
                          {item.productId.price.discountPercentage && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-black text-white">
                              {item.productId.price.discountPercentage}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center lg:justify-start gap-3">
                          <button
                            onClick={() => handleMoveToCart(item.productId._id)}
                            className="inline-flex cursor-pointer items-center px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 transition-all duration-200 text-sm"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => handleRemove(item.productId._id)}
                            className="inline-flex cursor-pointer items-center px-4 py-2 text-black font-semibold rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 transition-all duration-200 text-sm border border-gray-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
