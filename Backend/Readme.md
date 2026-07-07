# HireSync Backend

This directory contains the backend service for HireSync. It is the server-side part of the application and is responsible for managing data, user authentication, business logic, file uploads, API routes, and real-time communication.

## What the backend is responsible for

The backend powers the core functionality of the platform and makes the application work behind the scenes. It is responsible for:

- Handling client and freelancer authentication securely and consistently
- Managing jobs, proposals, contracts, notifications, messages, and reviews throughout their lifecycle
- Storing and retrieving data from MongoDB in a structured and reliable way
- Protecting routes with JWT-based authorization and access checks
- Processing uploaded files such as profile pictures and proposal attachments safely
- Supporting live messaging and online presence through Socket.IO
- Sending email-based notifications and verification workflows such as OTP-related actions

## Why this part of the project matters

The backend is the engine of the platform. Without it, the frontend would have no reliable way to register users, save jobs, manage proposals, or exchange information. It is the layer that connects the application to the database and ensures that the business rules of the marketplace are enforced properly.

## How the backend fits into the full application

The backend works as the central service behind the app. A typical request flow looks like this:

1. The frontend sends a request from a page or component after a user action such as login, job creation, or sending a message
2. The backend receives the request through its routes and identifies the correct endpoint
3. The controller processes the business logic, validates the incoming information, and applies any required rules
4. The backend interacts with MongoDB through the models to read or write the relevant data
5. The result is returned to the frontend, which updates the interface so the user sees the latest state
6. For real-time features, Socket.IO can push updates to connected clients instantly without requiring a full page refresh

This separation keeps the app organized and makes it easier to maintain as features grow.

## Typical backend workflow examples

A few common examples show how the backend supports the app:

- When a freelancer submits a proposal, the backend validates the request, stores the proposal under the correct job, and returns the updated state to the frontend
- When a client accepts a proposal, the backend updates the proposal status and creates or updates the related contract record
- When a user sends a message, the backend stores the message and makes it available to the other participant in real time
- When a user logs in, the backend verifies credentials, issues a token, and allows access to protected routes

These workflows are the foundation of the marketplace experience and are handled by the backend in a consistent, structured way.

## Backend structure

```text
Backend/
├── controllers/      # Handles the logic for each feature area
├── routes/           # Defines API endpoints for the frontend to call
├── models/           # Mongoose schemas for the database entities
├── middlewares/      # Authentication and file upload protection logic
├── services/         # Reusable service modules such as mail handling
├── db/               # Database connection setup
├── uploads/          # Folder for uploaded media and documents
├── app.js            # Express app configuration
├── server.js         # Server startup and socket configuration
└── package.json      # Backend dependencies and scripts
```

## Main backend folders and their purpose

- `routes/` — exposes the API endpoints used by the frontend and organizes requests by feature such as clients, freelancers, jobs, proposals, contracts, messages, notifications, and reviews
- `controllers/` — contains the code that processes requests and executes business logic for each feature, including validation, data preparation, and response handling
- `models/` — defines the data structure for users, jobs, proposals, contracts, messages, notifications, and related entities in MongoDB using Mongoose schemas
- `middlewares/` — protects routes and handles file uploads safely, often by checking authentication, authorization, ownership, and request validity before controller logic runs
- `services/` — stores support logic that is reused across the app, such as mail sending or other helper operations that are not directly tied to a route
- `db/` — contains the MongoDB connection setup so the app can connect to the database consistently from one place
- `uploads/` — stores uploaded files used by the app, such as profile images and proposal attachments, so they can be served or referenced later

## How to run the backend locally

From the backend folder, run:

```bash
cd Backend
npm install
node server.js
```

For easier development, you can also use:

```bash
cd Backend
npx nodemon
```

## Backend environment variables

The backend expects the following environment values:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

## Current status

The backend already supports the main marketplace actions across the project, including authentication, job and proposal handling, contract updates, notifications, messaging, and file-based uploads. The next focus is improving reliability, strengthening validation, and preparing the service for smoother deployment and long-term growth.

## Notes for contributors

If you are working on this backend, it is helpful to understand that the project is organized around feature-based routes and controllers. When adding new functionality, try to keep the logic flowing in a consistent way:

1. Define or update the route in the appropriate route file
2. Implement the feature logic in the corresponding controller
3. Use or extend the relevant model if new data needs to be stored
4. Add any needed middleware for authentication, validation, or file handling
5. Keep the response structure clear so the frontend can consume it predictably

This approach makes the backend easier to read, test, and scale as the project grows.