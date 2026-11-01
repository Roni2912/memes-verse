export const API = {
  imgflip: 'https://api.imgflip.com/get_memes',
  imgbb: 'https://api.imgbb.com/1/upload',
};

export const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY ?? '';

export const STORAGE_KEYS = {
  state: 'memeverse:state:v1',
  theme: 'memeverse:theme',
};

export const PAGE_SIZE = 20;
export const HOME_FEATURED_COUNT = 8;
export const LEADERBOARD_SIZE = 10;

export const SORT_OPTIONS = [
  { id: 'popular', label: 'Most popular' },
  { id: 'name', label: 'Name (A-Z)' },
  { id: 'likes', label: 'Liked first' },
];

export const COLLECTION_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'liked', label: 'Liked' },
  { id: 'saved', label: 'Saved' },
];

export const DEFAULT_PROFILE = {
  name: 'Guest',
  username: 'guest',
  bio: 'Meme enthusiast.',
  avatar: null,
  cover: null,
};

export const MEME_EDITOR = {
  minFont: 20,
  maxFont: 100,
  defaultFont: 56,
  maxExportSize: 1000,
  textColors: ['#ffffff', '#000000', '#facc15', '#ef4444', '#3b82f6', '#22c55e'],
};

export const CAPTION_IDEAS = [
  { top: 'Me debugging at 3 AM', bottom: 'It was a missing semicolon' },
  { top: 'It works on my machine', bottom: 'Then we ship your machine' },
  { top: 'Estimated: 2 hours', bottom: 'Actual: 2 days' },
  { top: 'Meeting at 9 AM', bottom: 'Could have been an email' },
  { top: 'Writes tests', bottom: 'Tests pass. Production does not' },
  { top: 'One does not simply', bottom: 'Merge without conflicts' },
  { top: 'Reading the docs', bottom: 'Still guessing' },
  { top: 'Friday 5 PM deploy', bottom: 'What could go wrong' },
];

export const IMAGE_LIMITS = {
  profileMaxEdge: 1200,
  jpegQuality: 0.8,
};
