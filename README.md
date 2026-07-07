# HireSync

HireSync is a full-stack freelance marketplace platform with separate Frontend and Backend projects.

## Overview

- **Frontend:** React + Vite application for client and freelancer workflows.
- **Backend:** Node.js + Express API with MongoDB persistence and Socket.io realtime support.
- **Features:** job posting, proposals, contracts, profiles, notifications, messaging, and realtime presence.

## Repository structure

```
HireSync/
├── README.md          # Root project documentation
├── Frontend/          # Frontend React + Vite application
└── Backend/           # Backend Express API service
```

## Frontend

The `Frontend` folder contains the React client application.

Key files:
- `Frontend/package.json` — frontend dependencies and scripts
- `Frontend/vite.config.js` — Vite configuration
- `Frontend/src/main.jsx` — app entry point
- `Frontend/src/App.jsx` — root application component
- `Frontend/src/socket.js` — Socket.io client initialization
- `Frontend/src/context/` — auth and notification providers
- `Frontend/pages/` — page routes for jobs, proposals, contracts, notifications, and profiles
- `Frontend/components/` — reusable UI components

## Backend

The `Backend` folder contains the API service and realtime server.

Key files:
- `Backend/package.json` — backend dependencies
- `Backend/server.js` — server startup and Socket.io configuration
- `Backend/app.js` — Express application setup
- `Backend/db/db.js` — MongoDB connection helper
- `Backend/routes/` — API route definitions
- `Backend/controllers/` — request handlers and business logic
- `Backend/models/` — database schemas
- `Backend/middlewares/` — auth and file upload middleware
- `Backend/socket.js` — realtime helper functions

## Run locally

### Backend

```bash
cd Backend
npm install
node server.js
```

For development reload, run:

```bash
cd Backend
npx nodemon
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend typically launches at `http://localhost:5173`.

## Notes

- Start the backend before the frontend.
- The frontend uses `Frontend/src/socket.js` for realtime socket connections.
- The backend service starts in `Backend/server.js`.

## Current status

- Client and freelancer dashboards are available.
- Job posting, proposal submission, contract management, profiles, notifications, and messaging are implemented.
- Realtime socket events support chat and presence.

## Support

This repository includes a root-level helper script to run both the Backend and Frontend together.

### Root commands
- `npm install` — install root dependencies, including `concurrently`
- `npm run start:backend` — start the backend service
- `npm run start:frontend` — start the frontend dev server
- `npm run dev:all` — run backend and frontend in parallel

### Notes
- The backend starts from `Backend/server.js`.
- The frontend starts from `Frontend/src/main.jsx`.
- Use `npm run dev:all` for a single command development workflow.

---

## 🔐 Security Features
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  skillsRequired: [String],
  budget: {
    type: String (fixed/hourly),
    min: Number,
    max: Number
  },
  duration: String,
  experienceLevel: String (entry/intermediate/expert),
  clientId: ObjectId (ref: Client),
  status: String (active/closed/completed),
  proposals: [ObjectId],
  createdAt: Date,
  deadline: Date,
  updatedAt: Date
}
```

### Proposal Schema
```javascript
{
  _id: ObjectId,
  jobId: ObjectId (ref: Job),
  freelancerId: ObjectId (ref: Freelancer),
  bidAmount: Number,
  estimatedDuration: String,
  message: String,
  attachments: [String],
  status: String (pending/accepted/rejected),
  createdAt: Date,
  updatedAt: Date
}
```

### Contract Schema
```javascript
{
  _id: ObjectId,
  jobId: ObjectId (ref: Job),
  clientId: ObjectId (ref: Client),
  freelancerId: ObjectId (ref: Freelancer),
  amount: Number,
  currency: String,
  startDate: Date,
  endDate: Date,
  milestones: [{
    title: String,
    amount: Number,
    dueDate: Date,
    completed: Boolean
  }],
  status: String (active/completed/cancelled),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **Token Blacklisting**: Revoke tokens on logout
- **Role-based Access Control**: Separate permissions for Clients and Freelancers
- **Protected Routes**: Frontend route guards and backend middleware

### Data Security
- **Input Validation**: All API inputs validated
- **CORS Protection**: Cross-origin requests controlled
- **SQL Injection Prevention**: Mongoose prevents NoSQL injection
- **XSS Protection**: React escapes content by default
- **Rate Limiting**: Prevent brute force attacks (can be added)

### File Upload Security
- **File Type Validation**: Only allowed file types accepted
- **File Size Limits**: Maximum file size enforced
- **Secure Storage**: Files stored outside web root
- **Access Control**: Only authorized users can access files

---

## 🧪 Testing

### Frontend Testing
```bash
cd Frontend
npm run test          # Run unit tests
npm run test:coverage # Generate coverage report
```

### Backend Testing
```bash
cd Backend
npm run test          # Run unit tests
npm run test:api      # Run API integration tests
```

---

## 📊 Performance Optimization

### Frontend Optimizations
- **Code Splitting**: Dynamic imports for lazy loading
- **Image Optimization**: Responsive images and compression
- **Caching**: Browser cache for static assets
- **Minification**: Production builds automatically minified

### Backend Optimizations
- **Database Indexing**: Indexes on frequently queried fields
- **Pagination**: Large result sets paginated
- **Caching**: Redis for session and query caching (optional)
- **Load Balancing**: Can be deployed across multiple instances

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change port or kill process
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

**MongoDB Connection Error**
- Verify MongoDB is running
- Check the backend database connection string
- Ensure IP whitelist includes your machine (for cloud DB)

**CORS Errors**
- Verify the frontend uses the correct API base URL
- Check CORS configuration in Backend app.js
- Ensure backend server is running

**Module Not Found**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables for production API URL

### Backend Deployment (Heroku/AWS/DigitalOcean)
1. Set production environment variables
2. Ensure MongoDB cloud instance is set up
3. Deploy code using Git or container images
4. Configure custom domain and SSL

---

## 📚 Documentation

- **[Backend README](./Backend/Readme.md)** - Detailed backend setup and API docs
- **[Frontend Setup](./Frontend/README.md)** - Frontend-specific configuration
- API Postman Collection: [Download](./api-collection.json)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository** to your GitHub account
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear, descriptive commits
4. **Commit with messages**: `git commit -m 'Add amazing feature'`
5. **Push to your branch**: `git push origin feature/amazing-feature`
6. **Submit a Pull Request** with detailed description

### Code Standards
- Follow ESLint configuration in `eslint.config.js`
- Write meaningful commit messages
- Add comments for complex logic
- Keep functions small and focused
- Test your code before submitting

---

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
