import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    add: (state, action) => {
      state.product.push(action.payload);
    },
  },
});

export const { add } = productSlice.actions;

export const getProduct = (state) => state.product.product;

export default productSlice.reducer;
