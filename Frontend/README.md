# HireSync Frontend

This directory contains the frontend of the HireSync application. It is the part of the project that users interact with directly in the browser. Its job is to present the marketplace clearly, guide users through each workflow, and communicate with the backend for data, authentication, and live updates.

## What the frontend is responsible for

The frontend handles all user-facing actions and screens, including:

- Client and freelancer authentication pages
- Separate dashboards for clients and freelancers
- Job discovery, posting, editing, and closing workflows
- Proposal submission and review pages
- Contract management and status views
- Messaging and notification interfaces
- Profile viewing, editing, and portfolio-related screens
- Live updates through Socket.IO for presence and chat interactions

## Why this part of the project matters

The frontend is the layer that turns the application into a usable product. It ensures that users can navigate the marketplace smoothly, understand what actions are available, and complete important tasks without needing to interact directly with the backend or database.

## How the frontend fits into the full application

When a user performs an action in the app, the flow is usually:

1. The user interacts with a page in the frontend
2. The frontend sends a request to the backend API
3. The backend processes the request and updates the database if needed
4. The frontend receives the response and updates the screen accordingly
5. If the feature uses real-time communication, Socket.IO can push live updates to the relevant users

This structure keeps the experience responsive while keeping the logic and data handling organized in the backend.

## Frontend structure

```text
Frontend/
├── components/       # Shared UI pieces such as navbar, footer, and layout components
├── pages/            # Main screens for authentication, dashboards, jobs, proposals, contracts, profiles, reviews, and messages
├── src/              # Core app files, routing, context providers, and socket setup
├── public/           # Static assets used by the app
├── package.json      # Frontend dependencies and scripts
└── vite.config.js    # Vite configuration for development and build
```

## Main frontend folders and their purpose

- `components/` — contains reusable UI elements used across many pages, such as navigation, layout, and common visual blocks
- `pages/` — contains the main screens of the application and is organized by feature area like jobs, proposals, contracts, profiles, and messages
- `src/context/` — stores shared context providers for features such as authentication and notifications
- `src/socket.js` — manages the client-side socket connection used for live communication
- `public/` — stores static files and assets that are served directly by the app

## How to run the frontend locally

From the frontend directory, run:

```bash
cd Frontend
npm install
npm run dev
```

Once the server starts, the application is usually available at:

```text
http://localhost:5173
```

## Available scripts

- `npm run dev` — starts the Vite development server
- `npm run build` — creates a production build
- `npm run preview` — previews the production build locally
- `npm run lint` — checks the code for linting issues

## Frontend environment requirement

The frontend depends on the backend API URL and expects it to be configured using the following variable:

```env
VITE_BASE_URL=http://localhost:3000
```

## Current status

The frontend already includes the main marketplace journeys and is connected to the backend. The next improvements are mainly focused on refinement, usability, and making the experience smoother and more polished for users.
