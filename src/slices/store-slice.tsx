import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitFormData } from './second-form-slice';

interface StoreState {
  lastAddedItem: InitFormData | null;
}

const initialState: StoreState = {
  lastAddedItem: null,
};

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateLastAddedItem: (state, action: PayloadAction<InitFormData | null>) => {
      state.lastAddedItem = action.payload;
    },
  },
});

export const { updateLastAddedItem } = storeSlice.actions;

export default storeSlice.reducer;
