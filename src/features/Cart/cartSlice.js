import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteCartItem, fetchItemsByUserId, resetCart, updateCartItem } from './cartAPI';

const initialState = {
  items:[],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async(item)=>{
    const response = await addToCart(item);
    return response.data;
  }
)

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async(userId)=>{
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
)

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async(updateItem)=>{
    const response = await updateCartItem(updateItem);
    return response.data;
  }
)

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async(deleteItem)=>{
    const deletedItemId = await deleteCartItem(deleteItem);
    return deletedItemId;
  }
)


export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async(userId)=>{
    const response = await resetCart(userId);
    return response.status;
  }
)


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
     .addCase(addToCartAsync.pending,(state)=>{
      state.status = 'loading';
     })
     .addCase(addToCartAsync.fulfilled,(state,action)=>{
       state.status = 'idle';
       state.items.push(action.payload);
     })
     .addCase(fetchItemsByUserIdAsync.pending,(state)=>{
      state.status = 'loading';
     })
     .addCase(fetchItemsByUserIdAsync.fulfilled,(state,action)=>{
       state.status = 'idle';
       state.items = action.payload;
     })
     .addCase(updateCartItemAsync.pending,(state)=>{
      state.status = 'loading';
     })
     .addCase(updateCartItemAsync.fulfilled,(state,action)=>{
       state.status = 'idle';
       const index = state.items.findIndex(item=>item.id === action.payload.id);
       state.items[index] = action.payload;
     })
     .addCase(deleteCartItemAsync.pending,(state)=>{
      state.status = 'loading';
     })
     .addCase(deleteCartItemAsync.fulfilled,(state,action)=>{
      state.status = 'idle';
      const index = state.items.findIndex(item=>item.id === action.payload);
      state.items.splice(index,1);
     })
  },
});


export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
