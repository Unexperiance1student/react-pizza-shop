import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { PizzaItem } from './types';

export const fetchPizzas = createAsyncThunk<
  PizzaItem[],
  Record<string, string>
>('pizza/fetchPizzas', async (params, thunkAPI: any) => {
  const { category, sortBy, order, search, currentPage } = params;
  const res = await axios.get<PizzaItem[]>(
    `https://631f574722cefb1edc498d47.mockapi.io/items?page=${currentPage}&limit=4${search}${category}&sortBy=${sortBy}&order=${order}`
  );

  // thunkAPI
  if (res.data.length === 0) return thunkAPI.rejectWithValue('Пиццы пустые');
  return thunkAPI.fulfillWithValue(res.data);
});
