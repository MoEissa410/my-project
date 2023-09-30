import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
    matchingProducts: [],
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
    setMatchingProduct: (state, action) => {
      state.matchingProducts = action.payload;
    },
    removeSearch: (state, action) => {
      state.search = "";
    },
  },
});
export const getSearchInput = (state) => state.search.search;
export const getMatchingProduct = (state) => state.search.matchingProducts;

export const { setSearchQuery, setMatchingProduct, removeSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
