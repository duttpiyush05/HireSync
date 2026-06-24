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
const cookieParser = require('cookie-parser')

connectToDB();

app.use(cors());
app.use(cookieParser())


app.use(express.json());
app.use(express.urlencoded({extended:true}))

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
module.exports = app;