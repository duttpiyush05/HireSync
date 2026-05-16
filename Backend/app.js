const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const app = express()
const cors = require('cors');
const connectToDB = require('./db/db');
const freelancerRoutes = require('./routes/freelancer_routes')
const clientRoutes = require('./routes/client_routes')

connectToDB();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>
{
    res.send("HireSync");
})

app.get('/freelancers', freelancerRoutes)
app.get('/clients', clientRoutes)

module.exports = app;