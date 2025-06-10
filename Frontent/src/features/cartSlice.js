// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../config/axiosConfig";

// const userId = "67e3845e82de2d59acc171ca";

// export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
//   const res = await axiosInstance.get(`/cart/${userId}`);
//   return res.data;
// });

// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ userId, productId, quantity,price }, thunkAPI) => {
//     try {
//       const body = {productId, quantity,price}
//       const response = await axiosInstance.post(`http://localhost:4001/cart/${userId}`,body)
//       console.log(response)
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     status: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//       });
//   },
// });

// export default cartSlice.reducer;

// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import axios from "../config/axiosConfig";

// // export const getCart = createAsyncThunk("cart/getCart", async (userId) => {
// //     const res = await axios.get(`/cart`);
// //     return res.data.userCart;
// // });

// // const cartSlice = createSlice({
// //     name: "cart",
// //     initialState: {
// //         userId: null,
// //         items: [],
// //         totalAmount: 0,
// //         status: "active",
// //         loading: false,
// //         error: null,
// //     },
// //     reducers: {
// //         addToCart: (state, action) => {
// //             const item = state.items.find((i) => i.productId._id === action.payload.productId);
// //             if (item) {
// //                 item.quantity += 1;
// //             } else {
// //                 state.items.push({ ...action.payload, quantity: 1 });
// //             }
// //         },
// //         removeFromCart: (state, action) => {
// //             console.log(action);
// //             state.items = state.items.filter((i) => i.productId._id !== action.payload);
// //         },
// //         incQty: (state, action) => {
// //             const item = state.items.find((i) => i.productId._id === action.payload);
// //             if (item) item.quantity += 1;
// //         },
// //         decQty: (state, action) => {
// //             const item = state.items.find((i) => i.productId._id === action.payload);
// //             if (item && item.quantity > 1) item.quantity -= 1;
// //         },
// //     },
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(getCart.pending, (state) => {
// //                 state.loading = true;
// //                 state.error = null;
// //             })
// //             .addCase(getCart.fulfilled, (state, action) => {
// //                 const { userId, items, totalAmount, status } = action.payload;
// //                 state.userId = userId;
// //                 state.items = items;
// //                 state.totalAmount = totalAmount;
// //                 state.status = status;
// //                 state.loading = false;
// //             })
// //             .addCase(getCart.rejected, (state, action) => {
// //                 state.loading = false;
// //                 state.error = action.error.message;
// //             });
// //     },
// // });

// // export const { addToCart, removeFromCart, incQty, decQty } = cartSlice.actions;
// // export default cartSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/cart/${userId}`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, price }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/${userId}`, { productId, quantity, price });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cart/${userId}`, { productId, quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/cart/${userId}/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export default cartSlice.reducer;