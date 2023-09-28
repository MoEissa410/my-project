// productSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Load the initial cart state from local storage or set it as an empty array
const initialCartState = JSON.parse(localStorage.getItem("cart")) || {
  allProducts: [],
  product: [],
  total: 0,
};
export const productSlice = createSlice({
  name: "product",
  initialState: initialCartState,
  reducers: {
    addAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    supTotal: (state) => {
      state.total = 0;
      state.product.forEach((element) => {
        state.total += element.price * element.quantity; // Add the total of each product to the state total
      });
    },
    add: (state, action) => {
      const { total, quantity, title, image, price, _id } = action.payload;
      const existingProduct = state.product.find(
        (product) => product._id === _id
      );

      if (!existingProduct) {
        state.product.push({ total, quantity, title, image, price, _id });
      } else {
        existingProduct.quantity += action.payload.quantity;
        existingProduct.total =
          existingProduct.quantity * existingProduct.price;
      }

      // Update local storage with the updated cart data
      localStorage.setItem("cart", JSON.stringify(state));
    },
    plusOne: (state, action) => {
      const { _id } = action.payload; /* نفس العنصر*/
      const existingProduct = state.product.find(
        (product) => product._id === _id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.total =
          existingProduct.quantity * existingProduct.price;
      }

      // Update local storage with the updated cart data
      localStorage.setItem("cart", JSON.stringify(state));
    },

    minusOne: (state, action) => {
      const { _id } = action.payload;

      // Find the index of the product with the given _id in the cart
      const existingProduct = state.product.find(
        (product) => product._id === _id
      );
      if (existingProduct.quantity === 1) {
        return;
      } else {
        existingProduct.quantity = existingProduct.quantity - 1;
        existingProduct.total =
          existingProduct.quantity * existingProduct.price;
      }

      // Remove the product from the cart if it exists

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
    removeAllProduct: (state, action) => {
      state.product = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  removeAllProduct,
  minusOne,
  plusOne,
  addAllProducts,
  add,
  removeProduct,
  supTotal,
} = productSlice.actions;
export const getSupTotal = (state) => state.product.total;

export const getProduct = (state) => state.product.product;
export const AllProducts = (state) => state.product.allProducts;

export default productSlice.reducer;
