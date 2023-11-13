import { createSlice } from '@reduxjs/toolkit';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../components/constants/constants';

const initialState = {
  search: '',
  page: BASE_PAGE,
  itemPerPage: BASE_ITEM_PER_PAGE,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setItemPerPage: (state, action) => {
      state.itemPerPage = action.payload;
    },
  },
});

export const { setSearch, setPage, setItemPerPage } = appSlice.actions;
export default appSlice.reducer;
