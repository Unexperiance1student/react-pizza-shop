import { CartItem, CartSliceState } from './types';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, actions: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === actions.payload.id &&
          obj.type === actions.payload.type &&
          obj.size === actions.payload.size
        );
      });
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...actions.payload, count: 1 });
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusProduct: (state, actions: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => {
        return (
          obj.id === actions.payload.id &&
          obj.type === actions.payload.type &&
          obj.size === actions.payload.size
        );
      });
      if (findItem) {
        findItem.count--;
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeProduct: (state, actions: PayloadAction<CartItem>) => {
      state.items = state.items.filter((obj) => {
        return (
          obj.id !== actions.payload.id ||
          obj.size !== actions.payload.size ||
          obj.type !== actions.payload.type
        );
      });
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearProduct: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProduct, minusProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
