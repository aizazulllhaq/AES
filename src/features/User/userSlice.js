import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders } from "./userApi";

const initialState = {
  value: 0,
  status: "idle",
  userOrders: [],
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "counter/fetchLoggedInUserOrders",
  async (userId) => {
    const data = await fetchLoggedInUserOrders(userId);
    return data;
  }
);

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this infomation can be different or more from logged-in user info
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
