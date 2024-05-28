import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addOrder } from "./orderApi";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (orderDetail) => {
    const { data } = await addOrder(orderDetail);
    return data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
