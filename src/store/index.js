import { configureStore } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../config/constants';
import { readJSON, writeJSON } from '../utils/storage';
import interactionsReducer from './interactionsSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    interactions: interactionsReducer,
    profile: profileReducer,
  },
  preloadedState: readPersistedState(),
});

function readPersistedState() {
  const saved = readJSON(STORAGE_KEYS.state, null);
  return saved && typeof saved === 'object' ? saved : undefined;
}

// Persist the whole store (it only holds user data), debounced.
let timer;
store.subscribe(() => {
  clearTimeout(timer);
  timer = setTimeout(() => writeJSON(STORAGE_KEYS.state, store.getState()), 150);
});
