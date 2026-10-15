import type {Product} from "../../interfaces.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createProduct, getProducts} from "./productsThunks.ts";

interface State {
  items: Product[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: State = {
  items: [],
  fetchLoading: false,
  createLoading: false
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload: products }) => {
        state.fetchLoading = false;
        state.items = products;
      })
      .addCase(getProducts.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createProduct.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.createLoading = false;
      });
  },
  selectors: {
    products: state => state.items,
    fetchLoading: state => state.fetchLoading,
    createLoading: state => state.createLoading,
  }
})

export const productsReducer = productsSlice.reducer
export const { products, fetchLoading, createLoading } = productsSlice.selectors