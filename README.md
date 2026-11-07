# Memories — frontend

React single-page app for **Memories**, a social board for sharing personal posts: titles, stories, photos, tags, likes, and comments. Users can sign in with email/password or Google OAuth, browse a paginated feed, search by text and tags, create or edit their posts, and open a detail view for comments.

## Stack

- React 16, Redux (thunk), React Router v5
- Material UI v4
- Axios client talking to the Memories REST API
- Vite 6

## Related repo

API and persistence live in the sibling backend: [memories-be](https://github.com/gipsy/memories-be).

## Prerequisites

- Node.js 20+ (Node 26 works)
- npm

## Setup

```bash
npm install
```

Committed `.npmrc` sets `legacy-peer-deps=true` (Material UI v4 + React 18). **Render runs `npm install` before your build command**, so this file must be in the repo—not only in the build script.

From the monorepo root, run `./scripts/pull-render-env.sh` to create `.env.development.local` with `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID` (synced from the Render **memories** API). Vite loads that file for `npm start`.

Optional manual copy: see `.env.example`. API calls use `VITE_API_URL` (default `http://localhost:5000`) — do not proxy `/posts` in Vite or client-side routes will return JSON instead of the SPA.

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Dev server at [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Production build in `build/` (gitignored; Render runs this on deploy) |
| `npm run preview` | Serve production build locally |

## Deploy (Render static site)

- **Build command:** `npm run build`
- **Publish directory:** `build`
- **Env at build time:** `.env.production` (committed `VITE_*` values)
- **SPA:** rewrite `/*` → `/index.html` (see `render.yaml`)

## Features (UI)

- **Feed** — paginated list of posts
- **Search** — filter by title text and tag chips
- **Create / edit** — form with optional base64 image upload
- **Post detail** — likes and comment thread
- **Auth** — sign up, sign in, Google OAuth; JWT stored in `localStorage`

## Security / dependencies

The app was migrated from Create React App to **Vite** so `npm audit` stays clean (no `react-scripts` / webpack toolchain). React 18 is used with Material UI v4 via `legacy-peer-deps` (`.npmrc` + `installConfig` in `package.json`).
