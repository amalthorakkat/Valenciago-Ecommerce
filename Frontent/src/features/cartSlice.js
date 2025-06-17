

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosConfig";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/cart/${userId}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, price, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/${userId}`, {
        productId,
        quantity,
        price,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/cart/${userId}`, {
        productId,
        quantity,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
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
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const saveForLater = createAsyncThunk(
  "cart/saveForLater",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/${userId}/save`, {
        productId,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const moveToCart = createAsyncThunk(
  "cart/moveToCart",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/cart/${userId}/move-to-cart`, {
        productId,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    savedItems: [],
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
        state.items = action.payload.items || [];
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.error = null;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(saveForLater.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.error = null;
      })
      .addCase(saveForLater.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(moveToCart.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.savedItems = action.payload.savedItems || [];
        state.totalPrice = action.payload.totalPrice || 0;
        state.error = null;
      })
      .addCase(moveToCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;