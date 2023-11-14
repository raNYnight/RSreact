import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BASE_ITEM_PER_PAGE, BASE_PAGE } from '../components/constants/constants';
import { RootState } from '../store/store';

export interface initialState {
  search: string;
  page: number;
  itemPerPage: string;
  detailedBeerID: number | null;
}

export const initialState: initialState = {
  search: '',
  page: BASE_PAGE,
  itemPerPage: BASE_ITEM_PER_PAGE,
  detailedBeerID: null,
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
    setDetailedBeerID: (state, action: PayloadAction<number | null>) => {
      state.detailedBeerID = action.payload;
    },
  },
});

export const { setSearch, setPage, setItemPerPage, setDetailedBeerID } = appSlice.actions;
export const selectSearch = (state: RootState) => state.app.search;
export const selectPage = (state: RootState) => state.app.page;
export const selectItemPerPage = (state: RootState) => state.app.itemPerPage;
export const selectDetailedBeerID = (state: RootState) => state.app.detailedBeerID;

export default appSlice.reducer;
