

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import toast from "react-hot-toast";
import MyLottieAnimation from "../components/lottie/addedToCartAnimation";

const useCart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleAddToCart = (productId, price, quantity, size) => { 
    if (!user || !user._id) {
      toast.error("Please login to add items to cart.");
      return;
    }
    try {
      dispatch(
        addToCart({ userId: user._id, productId, quantity, price, size }) 
      ).unwrap();
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } flex items-center justify-center gap-3 w-fit max-w-xs bg-white text-black shadow-xl rounded-lg px-4 py-3 mx-auto`}
          >
            <div>
              <MyLottieAnimation />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">
                {quantity} item{quantity > 1 ? "s" : ""} added to cart
              </div>
              <div className="text-xs text-gray-400 mt-1">
                View it in your cart.
              </div>
            </div>
          </div>
        ),
        {
          duration: 2000,
          position: "top-center",
        }
      );
    } catch (err) {
      toast.error("Failed to add item to cart.");
    }
  };

  return { handleAddToCart };
};

export default useCart;
