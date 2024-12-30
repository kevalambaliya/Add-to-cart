import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../config/Api";


export const fetchCarts = createAsyncThunk(
  "cart/fetchCarts",
  async (_, { rejectWithValue }) => {
    try {
      let res = await API.get("/carts");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, { rejectWithValue }) => {
    try {
      let res = await API.post("/carts", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      let res = await API.delete(`/carts/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  `/carts/updateQuantity`,
  async (data, { rejectWithValue }) => {
    try {
      let res = await API.patch(`/carts/${data.id}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  carts: [],
};

const CartSlice = createSlice({
  name: "carts",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.fulfilled, (state, { payload }) => {
        state.carts = payload;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.carts.push(payload);
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.carts = state.carts.filter(({ id }) => id != payload.id);
      })

      .addCase(updateQuantity.fulfilled, (state, { payload }) => {
        state.carts = state.carts.map((ele) =>
          ele.id == payload.id ?  payload  : ele
        );
      });
  },
});

// export { getCart, postCart };
export const cartReducer = CartSlice.reducer;
