# HireSync - Freelance Marketplace Platform

A comprehensive full-stack web application that connects clients with talented freelancers for project collaboration, proposal management, and contract execution.

## 🎯 Project Vision

HireSync is designed to simplify the freelance hiring process by creating a seamless platform where:
- **Clients** can post detailed job requirements with flexible payment options
- **Freelancers** can discover opportunities, submit competitive proposals, and build their careers
- **Both parties** can collaborate through contracts, track progress, and maintain communication
- **Trust and transparency** are built through user profiles, ratings, and real-time notifications

---

## 🛠 Technology Stack

### Frontend Architecture
- **React 18** - Modern UI library with hooks and functional components
- **Vite** - Lightning-fast build tool and dev server with HMR support
- **Context API** - Lightweight state management for auth and global data
  - `ClientContext` - Client-specific data and operations
  - `FLContext` - Freelancer-specific data and operations
  - `NotificationContext` - Real-time notification handling
- **CSS** - Custom styling with responsive design
- **Node.js 16+** - Runtime environment

### Backend Architecture
- **Node.js** - Asynchronous runtime environment
- **Express.js** - Minimal and flexible web framework
- **MongoDB** - NoSQL database for flexible schema management
- **JWT (JSON Web Tokens)** - Secure authentication mechanism
- **Multer** - Middleware for handling file uploads (profiles, documents)
- **CORS** - Cross-Origin Resource Sharing for API security
- **Dotenv** - Environment variable management

---

## 📁 Detailed Project Structure

```
HireSync/
│
├── README.md                        # Project documentation (this file)
├── package.json                     # Root package configuration
│
├── Frontend/                        # React + Vite Application
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── eslint.config.js            # Code linting rules
│   ├── index.html                  # HTML entry point
│   │
│   ├── src/
│   │   ├── main.jsx                # React entry point
│   │   ├── App.jsx                 # Root application component
│   │   ├── App.css                 # Global styles
│   │   ├── index.css               # Base styles
│   │   │
│   │   ├── assets/                 # Static assets (images, icons)
│   │   │
│   │   ├── context/                # React Context providers
│   │   │   ├── ClientContext.jsx   # Client authentication & data
│   │   │   ├── FLContext.jsx       # Freelancer authentication & data
│   │   │   └── NotificationContext.jsx # Real-time notifications
│   │   │
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.jsx          # Main navigation bar
│   │   │   ├── Layout.jsx          # Default layout wrapper
│   │   │   ├── ClientNavbar.jsx    # Client-specific navbar
│   │   │   ├── ClientLayout.jsx    # Client-specific layout
│   │   │   └── Footer.jsx          # Footer component
│   │   │
│   │   └── pages/                  # Page-level components (route targets)
│   │       ├── LandingPage.jsx     # Home page
│   │       │
│   │       ├── Authentication Pages
│   │       ├── FreelancerAuth.jsx  # FL signup
│   │       ├── ClientAuth.jsx      # Client signup
│   │       ├── LoginFLPage.jsx     # FL login
│   │       ├── LoginClient.jsx     # Client login
│   │       ├── RegisterPage.jsx    # FL registration
│   │       ├── ClientRegisterPage.jsx # Client registration
│   │       ├── FreelancerLogout.jsx
│   │       ├── ClientLogout.jsx
│   │       │
│   │       ├── Dashboard Pages
│   │       ├── FreelancerDashboard.jsx # FL main dashboard
│   │       ├── ClientDashboard.jsx     # Client main dashboard
│   │       │
│   │       ├── Job Management
│   │       ├── FindWork.jsx             # Browse jobs (FL view)
│   │       ├── ClientMyJobs.jsx         # Client's posted jobs
│   │       │
│   │       ├── ApplyJobs/               # Job application workflow
│   │       │   ├── JobDetails.jsx       # View job details
│   │       │   ├── CreateProposal.jsx   # Submit proposal
│   │       │   └── ProposalSubmitted.jsx # Confirmation page
│   │       │
│   │       ├── PostJob/                 # Job creation multi-step form
│   │       │   ├── JobPost.jsx          # Main form component
│   │       │   ├── Basics.jsx           # Step 1: Basic info
│   │       │   ├── Description.jsx      # Step 2: Detailed description
│   │       │   ├── FixedRate.jsx        # Step 3: Fixed rate pricing
│   │       │   ├── HourlyRate.jsx       # Step 3: Hourly rate pricing
│   │       │   ├── Budget.jsx           # Step 4: Budget setting
│   │       │   └── Review.jsx           # Step 5: Review & publish
│   │       │
│   │       ├── Proposals/               # Proposal management
│   │       └── Applicants.jsx           # View proposals (Client view)
│   │
│   │       ├── Contracts/               # Contract management
│   │       │   ├── Dashboard.jsx        # Contracts overview
│   │       │   └── Details.jsx          # Contract details
│   │       │
│   │       ├── Notifications/           # Notification pages
│   │       │   └── Notification.jsx     # Notification center
│   │       │
│   │       └── Profiles/                # User profile pages
│   │           ├── Public/
│   │           │   ├── ClientProfile.jsx    # Public client profile
│   │           │   └── FreelancerProfile.jsx # Public FL profile
│   │           └── Private/
│   │               ├── ClientProfile.jsx    # Client edit profile
│   │               └── FreelancerProfile.jsx # FL edit profile
│   │
│   └── public/                     # Public static files
│
└── Backend/                        # Node.js + Express API
    ├── package.json               # Backend dependencies
    ├── server.js                  # Server entry point & startup
    ├── app.js                     # Express app configuration & middleware setup
    ├── Readme.md                  # Backend-specific documentation
    │
    ├── db/
    │   └── db.js                  # MongoDB connection & configuration
    │
    ├── models/                    # Database schemas (Mongoose)
    │   ├── client_model.js        # Client schema (name, email, company, etc.)
    │   ├── fl_model.js            # Freelancer schema (skills, portfolio, rate, etc.)
    │   ├── job_model.js           # Job posting schema
    │   ├── proposals.js           # Proposal schema (FL bid on jobs)
    │   ├── contracts_model.js     # Contract schema (agreement between client & FL)
    │   ├── notification_model.js  # Notification schema (real-time updates)
    │   └── blackListTokenModel.js # Logout token blacklist (security)
    │
    ├── controllers/               # Route handlers & business logic
    │   ├── client_controller.js   # Client CRUD operations
    │   ├── fl_controller.js       # Freelancer CRUD operations
    │   ├── job_controller.js      # Job posting & retrieval
    │   ├── proposal_controller.js # Proposal submission & management
    │   ├── contract_controller.js # Contract operations
    │   └── notification_controller.js # Notification dispatch & retrieval
    │
    ├── routes/                    # API endpoint definitions
    │   ├── client_routes.js       # POST /register, GET /profile, etc.
    │   ├── freelancer_routes.js   # FL-specific routes
    │   ├── job_routes.js          # GET /jobs, POST /jobs, etc.
    │   ├── proposals_routes.js    # POST /proposals, GET /proposals/:id
    │   ├── contract_routes.js     # Contract endpoints
    │   └── notification_route.js  # Notification endpoints
    │
    ├── middlewares/               # Express middlewares
    │   ├── authentication.js      # JWT verification & user authentication
    │   └── multer.js              # File upload configuration (profile pics, documents)
    │
    ├── services/                  # Business logic & helper functions
    │   ├── client_services.js     # Client-related operations
    │   ├── freelancer_services.js # Freelancer-related operations
    │   └── job_services.js        # Job-related operations
    │
    └── uploads/                   # Directory for uploaded files
        ├── profiles/              # User profile pictures
        └── documents/             # Job descriptions, contracts, etc.
```

---

## ✨ Core Features

### For Clients
- **Job Posting**
  - Create detailed job postings with multi-step form
  - Choose between Fixed Rate and Hourly Rate pricing
  - Set budget limits and project scope
  - Rich description editor for detailed requirements
  
- **Freelancer Management**
  - Browse freelancer profiles and portfolios
  - Review proposals from interested freelancers
  - Compare qualifications and rates
  - Message freelancers directly
  
- **Contract Management**
  - Create binding contracts with freelancers
  - Track project milestones and deliverables
  - Manage payments and invoicing
  - View contract history and completion status
  
- **Dashboard**
  - Overview of active jobs and proposals
  - Real-time notifications of new proposals
  - Contract status tracking
  - Performance analytics

### For Freelancers
- **Job Discovery**
  - Browse and search available jobs
  - Filter by category, budget, and complexity
  - Save favorite jobs
  - View job details and client information
  
- **Proposal Submission**
  - Submit competitive proposals for jobs
  - Highlight relevant skills and experience
  - Specify estimated timeline
  - Track proposal status
  
- **Profile Management**
  - Showcase skills and expertise
  - Upload portfolio samples
  - Display hourly/project rates
  - Build reputation through ratings
  
- **Contract Tracking**
  - Monitor active contracts
  - Submit deliverables
  - Track payment status
  - Access contract history

### Common Features
- **Secure Authentication**
  - Separate login for Clients and Freelancers
  - JWT-based token authentication
  - Password security with hashing
  - Automatic logout & token blacklisting
  
- **Real-time Notifications**
  - Job updates and new proposals
  - Contract milestones
  - Message notifications
  - User activity updates
  
- **User Profiles**
  - Detailed profile information
  - Profile picture uploads
  - Skills and expertise display
  - Rating and review system
  
- **File Management**
  - Upload documents and files
  - Store proposals and contracts
  - Manage portfolio items
  - Secure file access

---

## 🚀 Getting Started

### System Requirements
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher (or yarn)
- **MongoDB**: v4.0 or higher (local or cloud instance)
- **Git**: v2.0 or higher
- **Modern web browser**: Chrome, Firefox, Safari, or Edge

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/HireSync.git
cd HireSync
```

#### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:
```
# Database
MONGODB_URI=mongodb://localhost:27017/hiresync
# or for cloud MongoDB:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hiresync

# Server Configuration
PORT=5000
NODE_ENV=development

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

#### 3. Frontend Setup
```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend` directory:
```
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

# App Configuration
VITE_APP_NAME=HireSync
```

---

## 🏃 Running the Application

### Development Environment

**Terminal 1 - Start Backend Server**
```bash
cd Backend
npm start
# Server will run on http://localhost:5000
```

**Terminal 2 - Start Frontend Dev Server**
```bash
cd Frontend
npm run dev
# Application will run on http://localhost:5173
```

### Production Build

**Build Frontend**
```bash
cd Frontend
npm run build
# Creates optimized build in dist/ directory
npm run preview
# Preview production build locally
```

**Deploy Backend**
```bash
cd Backend
# Set NODE_ENV=production in .env
npm start
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Routes
- `POST /auth/client/register` - Register as client
- `POST /auth/client/login` - Client login
- `POST /auth/freelancer/register` - Register as freelancer
- `POST /auth/freelancer/login` - Freelancer login
- `POST /auth/logout` - Logout (blacklist token)

### Client Routes
- `GET /clients/:id` - Get client profile
- `PUT /clients/:id` - Update client profile
- `GET /clients/:id/jobs` - Get client's posted jobs
- `GET /clients/:id/proposals` - Get proposals for client's jobs
- `GET /clients/:id/contracts` - Get client's contracts

### Freelancer Routes
- `GET /freelancers/:id` - Get freelancer profile
- `PUT /freelancers/:id` - Update freelancer profile
- `GET /freelancers/search` - Search freelancers
- `GET /freelancers/:id/portfolio` - Get portfolio items
- `GET /freelancers/:id/contracts` - Get freelancer's contracts

### Job Routes
- `GET /jobs` - Get all jobs (with filters)
- `POST /jobs` - Create new job (client only)
- `GET /jobs/:id` - Get job details
- `PUT /jobs/:id` - Update job (client only)
- `DELETE /jobs/:id` - Delete job (client only)
- `GET /jobs/:id/proposals` - Get proposals for a job

### Proposal Routes
- `POST /proposals` - Submit proposal (freelancer only)
- `GET /proposals/:id` - Get proposal details
- `PUT /proposals/:id` - Update proposal (freelancer only)
- `GET /proposals/job/:jobId` - Get all proposals for a job

### Contract Routes
- `POST /contracts` - Create contract
- `GET /contracts/:id` - Get contract details
- `PUT /contracts/:id` - Update contract status
- `GET /contracts/user/:userId` - Get user's contracts
- `PUT /contracts/:id/milestone` - Update milestone

### Notification Routes
- `GET /notifications/user/:userId` - Get user notifications
- `POST /notifications` - Create notification
- `PUT /notifications/:id/read` - Mark as read
- `DELETE /notifications/:id` - Delete notification

---

## 🗄 Database Schema Overview

### Client Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  company: String,
  industry: String,
  profilePicture: String (URL),
  bio: String,
  location: String,
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Freelancer Schema
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  profilePicture: String (URL),
  bio: String,
  skills: [String],
  hourlyRate: Number,
  portfolioURL: String,
  yearsOfExperience: Number,
  password: String (hashed),
  rating: Number (0-5),
  reviews: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Job Schema
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
# Change port in .env or kill process
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

**MongoDB Connection Error**
- Verify MongoDB is running
- Check connection string in .env
- Ensure IP whitelist includes your machine (for cloud DB)

**CORS Errors**
- Verify API URL in Frontend .env
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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

**Developer**: Piyush Dutt  
**Email**: piyush.dutt@example.com  
**GitHub**: [@piyushdutt](https://github.com/yourgithub)  
**LinkedIn**: [Piyush Dutt](https://linkedin.com/in/piyushdutt)

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
**Last Updated**: June 2026  
**Version**: 1.0.0

---

Made with ❤️ by **Piyush Dutt**
