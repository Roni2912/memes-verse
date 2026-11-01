import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_PROFILE } from '../config/constants';
import { resetAllData } from './actions';

const profileSlice = createSlice({
  name: 'profile',
  initialState: DEFAULT_PROFILE,
  reducers: {
    updateProfile: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllData, () => DEFAULT_PROFILE);
  },
});

export const { updateProfile } = profileSlice.actions;
export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;
