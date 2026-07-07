# HireSync

HireSync is a full-stack freelance marketplace platform built to connect clients and freelancers in one unified experience. It allows clients to publish jobs, evaluate proposals, and manage work contracts, while freelancers can explore available opportunities, submit proposals, communicate with clients, and monitor their work progress.

## Project overview

This repository contains the complete application as a split-stack project:

- Frontend: a React + Vite web application that provides the user-facing interface for the marketplace experience
- Backend: an Express + MongoDB service that handles authentication, database operations, business logic, API endpoints, and real-time communication

At this stage, the project is in an active MVP-style development phase. The core freelance marketplace workflows have already been implemented and connected across both layers, which means the application is moving beyond a basic prototype and into a more complete, practical product experience.

## What this platform is meant to do

HireSync is designed to support the full lifecycle of freelance work, from discovering an opportunity to completing the job. The key user journeys covered by the platform include:

- User registration and login for both clients and freelancers
- Job creation, browsing, editing, and closing
- Freelancer proposal submission for open jobs
- Client review and decision-making on submitted proposals
- Contract creation and status updates for accepted work
- Profile creation and editing, portfolio uploads, and review history
- Notifications and messaging between users
- Live online presence and real-time chat through socket-based communication

## Why the project matters

The purpose of this repository is not only to build a freelance marketplace, but also to demonstrate how a modern web application can be organized in a practical and scalable way. It brings together frontend user interface design, backend API development, database modeling, authentication, file handling, and real-time interaction in one coherent system.

## Architecture at a glance

The application is structured around a clean separation of concerns:

- The frontend focuses on presenting information, capturing user input, and guiding the user through each workflow
- The backend focuses on protecting data, applying business rules, and exposing the services the frontend needs
- The database stores persistent records for users, jobs, proposals, contracts, messages, and notifications
- Real-time communication is handled separately so users can receive updates instantly without refreshing the page

This makes the project easier to understand, maintain, and extend as new features are added later.

## Main technologies used

### Frontend
- React for building interactive user interfaces
- Vite for fast local development and efficient production builds
- React Router for navigation between screens
- Axios for communicating with the backend API
- Socket.IO client for live updates and messaging

### Backend
- Node.js and Express for the server and API layer
- MongoDB with Mongoose for storing and organizing application data
- JWT for authentication and protected routes
- Socket.IO for real-time messaging and online status features
- Nodemailer for email-based features such as OTP and notifications

### Development tooling
- ESLint for maintaining code quality
- Nodemon for automatic backend restarts during development
- Concurrently for launching frontend and backend together

## Repository structure

```text
HireSync/
├── Frontend/        # React/Vite frontend application
├── Backend/         # Express/MongoDB backend service
├── package.json     # Root scripts for running both services
└── README.md        # Project-level documentation
```

## How to run the project locally

### 1. Install dependencies

From the project root, install the dependencies for the root workspace first, then install the frontend and backend dependencies separately:

```bash
npm install
cd Frontend && npm install
cd ../Backend && npm install
```

### 2. Start the application

Once the dependencies are installed, you can start the full project from the repository root using:

```bash
npm run dev:all
```

This command launches both the backend and frontend together so the application can be used locally in a single workflow.

## Root scripts

The root package provides a few useful commands for development:

- `npm run start:backend` — starts the backend service
- `npm run start:frontend` — starts the frontend development server
- `npm run dev:all` — starts both services in parallel

## Documentation

For deeper information about each part of the application, see:

- [Frontend README](Frontend/README.md) — detailed documentation for the frontend application
- [Backend README](Backend/Readme.md) — detailed documentation for the backend service

## Current status

The core marketplace experience is already implemented and connected across the stack. The project is now in a stage where refinement, stability, validation, and preparation for deployment are the next important steps.

## 📞 Contact & Support

**Developer**: Piyush Dutt  
**Email**: dutt.piyush286@gmail.com  
**GitHub**: https://github.com/duttpiyush05
**LinkedIn**: https://www.linkedin.com/in/piyush-dutt-309128324

For questions, issues, or suggestions:
- Open an issue on GitHub
- Email the developer
- Check existing documentation

---

## 🙏 Acknowledgments

- React and Vite communities for excellent tools
- MongoDB for robust database solution
- Express.js for lightweight framework
- All contributors and supporters

---

**Project Status**: Active Development  
**Last Updated**: July 2026  
**Version**: 1.0.0

---

Made with ❤️ by **Piyush Dutt**
