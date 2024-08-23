import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadCategories(state, action){
      state.categories = [...action.payload];
    },
    loadProductsByCategory(state, action){
      state.products = [...action.payload];
    },
    loadProducts(state, action){
      state.products = [...action.payload];
    },
  },
});

export const {
  loadCategories,
  loadProductsByCategory,
  loadProducts,
} = productSlice.actions;

export default productSlice.reducer;