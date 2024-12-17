// src/store/store.ts

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice';

export const store = configureStore({
  reducer: {
    mfe: userReducer,
  },
});

