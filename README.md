# MemeVerse

A meme discovery and creation app built with **React 19, Redux Toolkit, React Router and Tailwind CSS**.

Live demo: https://memes-verse.vercel.app/

## Features

- **Explore** - search, sort, filter (liked / saved), grid and list views, "show more" pagination
- **Create** - caption a template or your own image on a canvas, download it or save it to your profile
- **Meme details** - like, save, share, comment, and open the editor with the template pre-selected
- **Leaderboard** - the most-used templates ranked by caption count
- **Profile** - your memes, liked and saved collections, editable profile, avatar and cover
- **Settings** - light / dark / system theme, profile editing, clear local data
- Responsive, keyboard accessible, respects `prefers-reduced-motion`

## Project structure

```
src/
├── config/        # site metadata, routes, nav, constants
├── services/      # API clients (Imgflip templates, optional ImgBB upload)
├── store/         # Redux slices (interactions, profile) + localStorage persistence
├── context/       # Theme and toast providers
├── hooks/         # useMemes, useShare, useClickOutside, useDocumentTitle
├── utils/         # formatting, storage, image + canvas helpers
├── components/    # ui/ (primitives), layout/, meme/, profile/
├── pages/         # route-level components
└── styles/        # global.css - design tokens + shared component classes
```

## Theming

All colours live in `src/styles/global.css` as CSS variables (a light set and a `.dark` set) and are
exposed to Tailwind as semantic tokens (`bg-surface`, `text-muted`, `border-line`, `bg-accent`, …).
Re-skin the whole app by editing those variables; components never hard-code colours.

## Getting started

```bash
git clone https://github.com/Roni2912/memes-verse
cd memes-verse
npm install
npm run dev
```

### Optional: image hosting

Copy `.env.example` to `.env` and set `VITE_IMGBB_API_KEY` to also upload saved memes to
[ImgBB](https://api.imgbb.com/). Without it, saved memes are kept in the browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |
| `npm run lint` | Lint the project |

## Deployment

Deployed on Vercel from the repository root. `vercel.json` rewrites every route to `index.html` for client-side routing.
