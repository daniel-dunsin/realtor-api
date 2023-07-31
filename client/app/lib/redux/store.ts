import { configureStore } from '@reduxjs/toolkit';
import { agentReducer } from './slices/agentSlice';
import { handlersReducer } from './slices/handlersSlice';
import { searchReducer } from './slices/searchSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    agent: agentReducer,
    handlers: handlersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type ActionDispatch = typeof store.dispatch;
