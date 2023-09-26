import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import searchReducer from "./searchSlice";
export const store = configureStore({
  reducer: { product: productSlice, search: searchReducer },
});
