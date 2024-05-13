import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchProductById, fetchProductsByFilter } from './productApi';

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: 'idle',
  itemsCount: 0,
  selectProduct: null,
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchAllCategoriesAsync = createAsyncThunk(
  'product/fetchAllCategories',
  async () => {
    const response = await fetchAllCategories();
    return response.data;
  }
);

export const fetchAllBrandsAsync = createAsyncThunk(
  'product/fetchAllBrands',
  async () => {
    const response = await fetchAllBrands();
    return response.data;
  }
);

export const fetchProductsByFilterAsync = createAsyncThunk(
  'product/fetchProductsByFilter',
  async ({ filter, sort, pagination }) => {
    const data = await fetchProductsByFilter(filter, sort, pagination);
    return data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const data = await fetchProductById(id);
    return data.data;
  }
)



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.itemsCount = action.payload.totalItemsCount;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchProductByIdAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectProduct = action.payload;
      });
  },
});

export const { increment } = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selectAllCategories = (state) => state.product.categories;
export const selectAllBrands = (state) => state.product.brands;
export const selectItemsCount = (state) => state.product.itemsCount;
export const selectProductById = (state) => state.product.selectProduct;

export default productSlice.reducer;
