import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATTING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategotyId: (state, actions: PayloadAction<number>) => {
      state.categoryId = actions.payload;
      String(state.categoryId);
    },
    setSort: (state, actions: PayloadAction<Sort>) => {
      state.sort = actions.payload;
    },
    setPageCount: (state, actions: PayloadAction<number>) => {
      state.currentPage = actions.payload;
    },
    setSearchValue: (state, actions: PayloadAction<string>) => {
      state.searchValue = actions.payload;
    },
    setFilters: (state, actions: PayloadAction<FilterSliceState>) => {
      if (Object.keys(actions.payload).length) {
        state.sort = actions.payload.sort;
        state.currentPage = Number(actions.payload.currentPage);
        state.categoryId = Number(actions.payload.categoryId);
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATTING_DESC,
        };
      }
    },
  },
});

export const {
  setSearchValue,
  setCategotyId,
  setSort,
  setPageCount,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
