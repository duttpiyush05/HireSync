const jobModel = require('../models/job_model')
const {validationResult} = require('express-validator')
const jobServices = require('../services/job_services')

module.exports.createJob = async (req, res, next) =>
{
  const error = validationResult(req)
  if(!error.isEmpty())
  {    return res.status(401).json({message : error.array()})
  } 
  const {title, category, description, skills, budget} = req.body
  const client = req.client
  const job = await jobServices.createJob({
    title,
    category,
    description,
    skills,
    budget,
    client : client._id
  })
  res.status(201).json({message : "Job Created Successfully", job})
}


