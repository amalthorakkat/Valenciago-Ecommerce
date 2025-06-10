import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from "../features/cartSlice";
import MyLottieAnimation from "../components/lottie/cartLottie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, status } = useSelector((state) => state.cart);
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

  if (status === "loading") {
    return <div className="text-center py-6">Loading...</div>;
  }

  const message =
    !items || items.length === 0
      ? "Your cart is empty."
      : "Your items are packed and ready";

  return (
    <>
      <div className="flex items-center justify-center h-[200px] bg-[#202020] text-white">
        <h1 className="font-medium text-[20px] sm:text-2xl md:text-3xl lg:text-3xl">
          {message}
        </h1>
      </div>
      <div className="bg-gray-100 py-6 px-6">
        <div className="max-w-6xl mx-auto bg-white p-4 rounded  ">
          {items.map((item) => (
            <div
              key={item.productId._id}
              className="flex flex-col items-center sm:flex-row gap-4 pt-4 mb-5"
            >
              {/* Product Image */}
              <div className="w-full sm:w-1/4 flex justify-center items-start">
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="h-40 w-40 object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-medium text-gray-800">
                  {item.productId.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {item.productId.category}
                </p>

                {/* Price Info */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-800">
                    ${item.price}
                  </span>
                  {item.productId.price.original && (
                    <span className="text-sm line-through text-gray-500">
                      ${item.productId.price.original}
                    </span>
                  )}
                  {item.productId.price.discountPercentage && (
                    <span className="text-sm text-green-600 font-semibold">
                      {item.productId.price.discountPercentage}% off
                    </span>
                  )}
                </div>

                {/* Quantity & Actions */}
                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  {/* Quantity selector */}
                  <div className="border border-gray-300 rounded px-2 py-1 flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleDecrement(item.productId._id, item.quantity)
                      }
                      className="text-gray-700 cursor-pointer"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleIncrement(item.productId._id, item.quantity)
                      }
                      className="text-gray-700 cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Action buttons */}
                  <button
                    onClick={() => alert("Buy functionality not implemented")}
                    className="text-blue-600 text-sm font-medium hover:underline cursor-pointer"
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => handleRemove(item.productId._id)}
                    className="text-red-500 text-sm font-medium hover:underline cursor-pointer"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Total Price Section */}
          {items && items.length > 0 ? (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  Total Price:
                </h2>
                <span className="text-lg sm:text-xl font-bold text-gray-800">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="mt-6 flex justify-center sm:justify-end">
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-black text-[13px] text-white px-3 py-2 rounded-md hover:bg-gray-800 transition-all duration-300 cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 flex items-center justify-center">
              <MyLottieAnimation />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
