import { createSlice } from '@reduxjs/toolkit';

export interface InitFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  profilePicture: string | ArrayBuffer | null;
  country: string;
}

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

const secondFormSlice = createSlice({
  name: 'secondForm',
  initialState,
  reducers: {
    updateSecondFormData: (state, action) => (state = action.payload),
  },
});

export const { updateSecondFormData } = secondFormSlice.actions;

export default secondFormSlice.reducer;
