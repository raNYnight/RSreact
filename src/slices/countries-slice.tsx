import { createSlice } from '@reduxjs/toolkit';
import countriesData from '../utils/region-codes/region-codes.json';

export interface CountryData {
  country: string;
  code: string;
  flag: string;
  [key: string]: string;
}

export interface CountriesDataState extends Array<CountryData> {}

const initialState: CountriesDataState = Object.entries(countriesData).map(([country, data]) => ({
  country,
  code: data.code,
  flag: data.flag,
}));

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export default countriesSlice.reducer;
