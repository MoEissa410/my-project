import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const getSearchInput = (state) => state.search.search;
export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
