import { configureStore } from '@reduxjs/toolkit';
import { searchReducer } from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;
