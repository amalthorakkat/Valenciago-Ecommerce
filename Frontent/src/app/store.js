import { configureStore } from "@reduxjs/toolkit";
// import productReducer from "../features/productSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";

const store = configureStore({
  reducer: {
    // products: productReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
