// productSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Load the initial cart state from local storage or set it as an empty array
const initialCartState = JSON.parse(localStorage.getItem("cart")) || {
  product: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState: initialCartState,
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    add: (state, action) => {
      const { title, image, price, _id } = action.payload;
      const existingProduct = state.product.find(
        (product) => product._id === _id
      );

      if (!existingProduct) {
        state.product.push({ title, image, price, _id });
      }

      // Update local storage with the updated cart data
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      const { _id } = action.payload;

      // Find the index of the product with the given _id in the cart
      const index = state.product.findIndex((product) => product._id === _id);

      if (index !== -1) {
        // Remove the product from the cart if it exists
        state.product.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addAllProducts, add, removeProduct } = productSlice.actions;

export const getProduct = (state) => state.product.product;
export const AllProducts = (state) => state.product.allProducts;

export default productSlice.reducer;
