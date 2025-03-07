import { configureStore } from '@reduxjs/toolkit';
import memesReducer from './memesSlice';

export const store = configureStore({
  reducer: {
    memes: memesReducer,
  },
});