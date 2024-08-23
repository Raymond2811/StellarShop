import { createSlice } from "@reduxjs/toolkit";

const initialState ={
  currentCategory: "",
};

const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState,
  reducers:{
    setCurrentCategory(state, action) {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = currentCategorySlice.actions;
export default currentCategorySlice.reducer;