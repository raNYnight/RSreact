import { createSlice } from '@reduxjs/toolkit';
import { InitFormData } from './second-form-slice';

export const initialState: InitFormData = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTerms: false,
  profilePicture: null,
  country: '',
};

const firstFormSlice = createSlice({
  name: 'firstForm',
  initialState,
  reducers: {
    updateFirstFormData: (state, action) => (state = action.payload),
  },
});

export const { updateFirstFormData } = firstFormSlice.actions;

export default firstFormSlice.reducer;
