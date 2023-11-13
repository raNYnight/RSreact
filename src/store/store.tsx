import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice';
import { beerApi } from '../slices/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    app: appReducer,
    [beerApi.reducerPath]: beerApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(beerApi.middleware),
});

setupListeners(store.dispatch);

export default store;
