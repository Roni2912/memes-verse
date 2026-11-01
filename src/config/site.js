import {
  Home,
  Compass,
  PlusSquare,
  Trophy,
  User,
  Heart,
  Bookmark,
  Settings,
} from 'lucide-react';

export const SITE = {
  name: 'MemeVerse',
  tagline: 'Browse, create and collect memes.',
  description:
    'MemeVerse is a meme discovery and creation app built with React, Redux Toolkit and Tailwind CSS.',
  author: 'Ronish Dudhat',
  repo: 'https://github.com/Roni2912/memes-verse',
};

export const ROUTES = {
  home: '/',
  explore: '/explore',
  create: '/create',
  leaderboard: '/leaderboard',
  meme: (id) => `/meme/${id}`,
  profile: (tab) => (tab && tab !== 'posts' ? `/profile/${tab}` : '/profile'),
};

export const NAV_LINKS = [
  { label: 'Home', to: ROUTES.home, icon: Home, end: true },
  { label: 'Explore', to: ROUTES.explore, icon: Compass },
  { label: 'Create', to: ROUTES.create, icon: PlusSquare },
  { label: 'Leaderboard', to: ROUTES.leaderboard, icon: Trophy },
];

export const PROFILE_TABS = [
  { id: 'posts', label: 'My memes', icon: User },
  { id: 'liked', label: 'Liked', icon: Heart },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const PROFILE_MENU = [
  { label: 'My profile', to: ROUTES.profile('posts'), icon: User },
  { label: 'Liked memes', to: ROUTES.profile('liked'), icon: Heart },
  { label: 'Saved memes', to: ROUTES.profile('saved'), icon: Bookmark },
  { label: 'Settings', to: ROUTES.profile('settings'), icon: Settings },
];

export const THEME_OPTIONS = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'system', label: 'System' },
];
