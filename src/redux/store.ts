import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart/slice';
import filterSlice from './filter/slice';
import pizzaSlice from './pizza/slice';

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartSlice,
    pizza: pizzaSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDsipatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDsipatch>();
