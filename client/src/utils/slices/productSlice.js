import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  categories: [],
  currentCategory: "",
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCurrentCategory(state, action){
      state.currentCategory = action.payload;
    },
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
  setCurrentCategory,
} = productSlice.actions;

export default productSlice.reducer;