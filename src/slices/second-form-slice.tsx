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
export interface InitState {
  formData: InitFormData;
  submits: InitFormData[];
}

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

const secondFormSlice = createSlice({
  name: 'secondForm',
  initialState,
  reducers: {
    updateSecondFormData: (state, action) => {
      state.formData = action.payload;
      state.submits.push(action.payload);
    },
  },
});

export const { updateSecondFormData } = secondFormSlice.actions;

export default secondFormSlice.reducer;
