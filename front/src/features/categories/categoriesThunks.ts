import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Category} from "../../interfaces.ts";

export const getCategories = createAsyncThunk<Category[]>(
  'categories/get',
  async () => {
    const {data: categories} = await axiosApi('/categories');
    return categories;
  }
);