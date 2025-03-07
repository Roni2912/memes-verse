import { createSlice } from '@reduxjs/toolkit';

const memesSlice = createSlice({
  name: 'memes',
  initialState: {
    memes: [],
    likedMemes: [],
  },
  reducers: {
    setMemes: (state, action) => {
      state.memes = action.payload;
    },
    likeMeme: (state, action) => {
      state.likedMemes.push(action.payload);
      localStorage.setItem('likedMemes', JSON.stringify(state.likedMemes));
    },
  },
});

export const { setMemes, likeMeme } = memesSlice.actions;
export default memesSlice.reducer;