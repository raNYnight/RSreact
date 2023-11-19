import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { beerApi } from '../slices/apiSlice';
import appReducer from '../slices/appSlice';

const rootReducer = combineReducers({
  app: appReducer,
  [beerApi.reducerPath]: beerApi.reducer,
});
const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(
        beerApi.middleware
      ),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
