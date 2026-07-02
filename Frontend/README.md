**HireSync — Frontend (expanded)**

This folder contains the HireSync frontend application built with React and Vite. It implements the client and freelancer user interfaces and communicates with the Backend using REST APIs and WebSocket (socket.io) for realtime features (chat, online presence, typing indicators).

Summary
- Framework: React 18
- Bundler / dev server: Vite (dev at http://localhost:5173)
- Realtime: socket.io-client (configured in `src/socket.js`)
- API client: `axios` (used across services)

Prerequisites
- Node.js 14+ (16+ recommended)
- npm (or yarn)
- Backend service running (default: `http://localhost:3000`). See [Backend/server.js](../Backend/server.js) for server port and socket origin configuration.

Environment
Create a file named `.env` or `.env.local` in this folder with environment variables used at build/dev time. Minimal example:

VITE_BASE_URL=http://localhost:3000

- `VITE_BASE_URL` is used by `src/socket.js` and by frontend services when constructing API URLs. Vite exposes variables that start with `VITE_` to client code via `import.meta.env`.

Install

```bash
npm install
```

Run (development)

```bash
npm run dev
```

This starts Vite with HMR at `http://localhost:5173` by default.

Build and preview (production)

```bash
npm run build
npm run preview
```

Linting

```bash
npm run lint
```

Scripts (from `package.json`)
- `dev` — start Vite dev server
- `build` — build production bundle
- `preview` — preview production build locally
- `lint` — run ESLint across the project

Connecting to the Backend and sockets
- REST API: Services in `Frontend/src` typically use `VITE_BASE_URL` as the base URL for axios requests. If you keep the backend on `http://localhost:3000`, no change is needed.
- Socket: `src/socket.js` initializes the socket client like this:

```js
import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_BASE_URL, { autoConnect: true })
export default socket
```

Advice:
- Start the Backend first, then start the Frontend dev server. Backend uses port `3000` by default and allows origin `http://localhost:5173` for socket connections (see [Backend/server.js](../Backend/server.js)).
- If you change ports/hosts, update `VITE_BASE_URL` accordingly.

Run backend+frontend together (optional)
If you'd like a single command to run both during development, we can add a small helper. Two common approaches:

- Add `concurrently` or `npm-run-all` as a dev dependency in the repository root and create an npm script that runs both servers.
- Or run two terminals: one for the backend (e.g., `cd Backend && npx nodemon`) and one for the frontend (`cd Frontend && npm run dev`).

Example `package.json` (root) snippet to run both using `concurrently`:

```json
"scripts": {
  "start:backend": "cd Backend && npx nodemon",
  "start:frontend": "cd Frontend && npm run dev",
  "dev:all": "concurrently \"npm:serve-backend\" \"npm:serve-frontend\""
}
```

Folder structure (important parts)
- `src/` — main client source files
- `src/socket.js` — socket.io client setup
- `src/App.jsx`, `src/main.jsx` — app entry points
- `pages/` — route pages (Client, Freelancer, Jobs, Messages)
- `components/` — shared UI components and layout

Troubleshooting
- Sockets not connecting: verify `VITE_BASE_URL`, ensure backend is listening, check browser console for CORS or connection errors.
- CORS errors: confirm backend socket origin includes `http://localhost:5173` or update backend CORS configuration.
- HMR not updating: restart the dev server; check for console errors in the terminal.

Testing & further improvements
- Add `vitest` or other test runner for unit tests if desired.
- Add a `.env.example` file with `VITE_BASE_URL` and any other envs you need. I can create it for you.

Contributing
- Follow the code style and run `npm run lint` before opening PRs.
- If you add new env vars, document them here and add them to `.env.example`.

Need me to do more?
- I can: create `.env.example`, add a `dev:all` script to the repo root to run both servers, or create a short contributing guide. Tell me which you'd like and I'll implement it.
