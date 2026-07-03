# HireSync Frontend

The Frontend folder contains the React + Vite client application for HireSync.

## What this frontend contains

- React pages for clients and freelancers.
- Job browsing, proposal submission, contract management, notifications, and messaging.
- Shared context providers for authentication and notifications.
- Socket.io client initialization in `src/socket.js`.

## Key files

- `Frontend/package.json` — frontend dependencies and scripts
- `Frontend/vite.config.js` — Vite configuration
- `Frontend/src/main.jsx` — React app bootstrap
- `Frontend/src/App.jsx` — application root component
- `Frontend/src/socket.js` — realtime socket client
- `Frontend/src/context/` — context providers
- `Frontend/pages/` — page routes and feature screens
- `Frontend/components/` — reusable UI components

## Run locally

```bash
cd Frontend
npm install
npm run dev
```

The Vite dev server usually starts at `http://localhost:5173`.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — build the production bundle
- `npm run preview` — preview the built app
- `npm run lint` — run ESLint checks

## Notes

- Start the backend first, then the frontend, or use the root helper script `npm run dev:all`.
- The frontend connects to the backend and realtime services from `Frontend/src/socket.js`.
- No explicit env variable setup is documented here.
