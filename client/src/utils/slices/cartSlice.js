import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartOpen: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action){
      state.cartOpen = true;
      state.cartItems.push(action.payload);
    },
    addMultipleToCart(state, action){
      state.cartItems.push(...action.payload);
    },
    removeFromCart(state, action){
      state.cartItems = state.cartItems.filter(product => product._id !== action.payload);
      state.cartOpen = state.cartItems.length > 0;
    },
    updateCartQuantity(state, action){
      state.cartOpen = true;
      state.cartItems = state.cartItems.map((product) => {
        if(action.payload._id === product._id){
          product.quantity = action.payload.quantity;
        }
        return product;
      });
    },
    clearCart(state){
      state.cartOpen = false;
      state.cartItems = [];
    },
    toggleCart(state){
      state.cartOpen = !state.cartOpen;
    },
  }
});

export const {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
