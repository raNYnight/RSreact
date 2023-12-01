import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import FirstFormReducer from '../slices/first-form-slice';
import SecondFormReducer from '../slices/second-form-slice';
import CountriesReducer from '../slices/countries-slice';

const rootReducer = combineReducers({
  firstForm: FirstFormReducer,
  secondForm: SecondFormReducer,
  countries: CountriesReducer,
});
const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
