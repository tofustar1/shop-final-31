import type {Category} from "../../interfaces.ts";
import {createSlice} from "@reduxjs/toolkit";
import {getCategories} from "./categoriesThunks.ts";

interface State {
  items: Category[];
  fetchLoading: boolean;
}

const initialState: State = {
  items: [],
  fetchLoading: false,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, {payload: categories}) => {
        state.fetchLoading = false;
        state.items = categories;
      })
      .addCase(getCategories.rejected, (state) => {
        state.fetchLoading = false;
      })
  },
  selectors: {
    categories: state => state.items,
    fetchCategories: state => state.fetchLoading,
  }
});

export const categoriesReducer = categoriesSlice.reducer;
export const {categories, fetchCategories} = categoriesSlice.selectors;