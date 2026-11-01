import { createSlice, nanoid } from '@reduxjs/toolkit';
import { resetAllData } from './actions';

const initialState = {
  liked: {}, // { [memeId]: true }
  saved: {}, // { [memeId]: true }
  comments: {}, // { [memeId]: Comment[] }
  created: [], // memes made with the editor
};

const toggle = (map, id) => {
  if (map[id]) delete map[id];
  else map[id] = true;
};

const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {
    toggleLike: (state, { payload: id }) => toggle(state.liked, id),
    toggleSave: (state, { payload: id }) => toggle(state.saved, id),
    addComment: {
      reducer: (state, { payload }) => {
        (state.comments[payload.memeId] ??= []).push(payload.comment);
      },
      prepare: ({ memeId, text, author }) => ({
        payload: {
          memeId,
          comment: { id: nanoid(), text, author, createdAt: new Date().toISOString() },
        },
      }),
    },
    removeComment: (state, { payload: { memeId, commentId } }) => {
      state.comments[memeId] = (state.comments[memeId] ?? []).filter((c) => c.id !== commentId);
    },
    addCreatedMeme: {
      reducer: (state, { payload }) => {
        state.created.unshift(payload);
      },
      prepare: ({ name, url }) => ({
        payload: {
          id: `mine-${nanoid(8)}`,
          name,
          url,
          uses: 0,
          source: 'created',
          createdAt: new Date().toISOString(),
        },
      }),
    },
    removeCreatedMeme: (state, { payload: id }) => {
      state.created = state.created.filter((m) => m.id !== id);
      delete state.liked[id];
      delete state.saved[id];
      delete state.comments[id];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllData, () => initialState);
  },
});

export const {
  toggleLike,
  toggleSave,
  addComment,
  removeComment,
  addCreatedMeme,
  removeCreatedMeme,
} = interactionsSlice.actions;

export const selectIsLiked = (id) => (state) => Boolean(state.interactions.liked[id]);
export const selectIsSaved = (id) => (state) => Boolean(state.interactions.saved[id]);
export const selectComments = (id) => (state) => state.interactions.comments[id] ?? EMPTY;
export const selectLikedMap = (state) => state.interactions.liked;
export const selectSavedMap = (state) => state.interactions.saved;
export const selectCreated = (state) => state.interactions.created;
const EMPTY = [];

export default interactionsSlice.reducer;
