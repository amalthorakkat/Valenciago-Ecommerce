import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, price }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/${userId}`, {
        productId,
        quantity,
        price,
      });
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
      const response = await axiosInstance.put(`/cart/${userId}`, {
        productId,
        quantity,
      });
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
      const response = await axiosInstance.delete(
        `/cart/${userId}/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveForLater = createAsyncThunk(
  "cart/saveForLater",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/${userId}/save`, {
        productId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const moveToCart = createAsyncThunk(
  "cart/moveToCart",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/cart/${userId}/move-to-cart`,
        { productId }
      );
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
    savedItems: [], // New field for saved items
    totalPrice: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.savedItems = action.payload.savedItems || []; // Initialize if not provided
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.savedItems = action.payload.savedItems || state.savedItems;
        state.totalPrice = action.payload.totalPrice;
      })
      // Update Cart Item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.savedItems = action.payload.savedItems || state.savedItems;
        state.totalPrice = action.payload.totalPrice;
      })
      // Remove from Cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.savedItems = action.payload.savedItems || state.savedItems;
        state.totalPrice = action.payload.totalPrice;
      })
      // Save for Later
      .addCase(saveForLater.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice;
      })
      // Move to Cart
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice;
      });
  },
});

export default cartSlice.reducer;
