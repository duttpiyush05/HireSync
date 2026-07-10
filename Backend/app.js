const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express()
const cors = require('cors');
const connectToDB = require('./db/db');
const freelancerRoutes = require('./routes/freelancer_routes')
const clientRoutes = require('./routes/client_routes')
const jobRoutes = require('./routes/job_routes')
const proposalRoutes = require('./routes/proposals_routes')
const contractRoutes = require('./routes/contract_routes')
const notificationRoutes = require('./routes/notification_route')
const reviewRoutes= require('./routes/review_routes')
const conversationRoutes = require('./routes/conversation_router')
const messageRoutes = require('./routes/message_routes')
const cookieParser = require('cookie-parser')

const path = require('path')


connectToDB();

const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        credentials: true
    })
);
app.use(cookieParser())


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
)

app.get('/', (req,res)=>
{
    res.send("HireSync");
})

app.use('/freelancers', freelancerRoutes)
app.use('/clients', clientRoutes)
app.use('/jobs', jobRoutes)
app.use('/proposals', proposalRoutes)
app.use('/contracts', contractRoutes)
app.use('/notifications', notificationRoutes)
app.use('/reviews', reviewRoutes)
app.use('/conversations', conversationRoutes)
app.use('/messages', messageRoutes)

module.exports = app;