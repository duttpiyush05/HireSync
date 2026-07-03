# HireSync Backend

The Backend project provides the API and realtime service for HireSync.

## What this backend contains

- Express API routes for clients, freelancers, jobs, proposals, contracts, notifications, and messages.
- Socket.io setup for realtime chat, online status, and notifications.
- MongoDB integration via `Backend/db/db.js`.
- Authentication middleware using JWTs.
- File upload handling using `multer`.

## Key files

- `Backend/server.js` — server startup and Socket.io configuration
- `Backend/app.js` — Express app setup and route registration
- `Backend/db/db.js` — MongoDB connection logic
- `Backend/routes/` — API route definitions
- `Backend/controllers/` — business logic and request handlers
- `Backend/models/` — Mongoose schemas
- `Backend/middlewares/` — authentication and upload middleware
- `Backend/socket.js` — Socket.io helper functions

## Run locally

```bash
cd Backend
npm install
node server.js
```

For development reload, use `nodemon` if it is installed:

```bash
cd Backend
npx nodemon
```

## Notes

- The backend service starts in `Backend/server.js`.
- Realtime socket connections are configured to allow the frontend origin.
- The backend is designed to run separately from the frontend.
- For development, you can start both services together from the root with `npm run dev:all`.
