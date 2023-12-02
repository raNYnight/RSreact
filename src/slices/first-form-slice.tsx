import { createSlice } from '@reduxjs/toolkit';
import { InitState } from './second-form-slice';

export const initialState: InitState = {
  formData: {
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    acceptTerms: false,
    profilePicture: null,
    country: '',
  },
  submits: [],
};

const firstFormSlice = createSlice({
  name: 'firstForm',
  initialState,
  reducers: {
    updateFirstFormData: (state, action) => {
      state.formData = action.payload;
      state.submits.push(action.payload);
    },
  },
});

export const { updateFirstFormData } = firstFormSlice.actions;

export default firstFormSlice.reducer;
