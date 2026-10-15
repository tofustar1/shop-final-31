import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Product, ProductMutation} from "../../interfaces.ts";
import axiosApi from "../../axiosApi.ts";
import type {RootState} from "../../app/store.ts";

export const getProducts = createAsyncThunk<Product[]>(
  'products/getAll',
  async () => {
    const { data: products } = await axiosApi('/products');
    return products
  }
)

export const createProduct = createAsyncThunk<void, ProductMutation, {state: RootState}>(
  'products/create',
  async (product, {getState},) => {
    const token = getState().users.user.token;
    const formData = new FormData();

    const keys = Object.keys(product) as (keyof ProductMutation)[];
    keys.forEach(key => {
      const value = product[key];

      if (value) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('/products', formData, {headers: {'Authorization': token}});
  }
)