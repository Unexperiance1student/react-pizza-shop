import { PizzaItem, PizzaSliceState, Status } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading || success || error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, actions: PayloadAction<PizzaItem[]>) => {
      state.items = actions.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, actions) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, actions) => {
      state.items = actions.payload;
      state.status = Status.COMPLETED;
    });
    builder.addCase(fetchPizzas.rejected, (state, actions) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
