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
  const client = req.user
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

module.exports.getMyJobs = async (req, res, next) => {
  try
  {
    const jobs = await jobServices.getMyJobs(req.user._id);
    console.log(req.user._id)
    res.status(200).json({ jobs });
  }
  catch (error) {
    next(error);
  }
}

module.exports.getAllJobs = async (req, res, next) => {
  try
  {  
    const jobs = await jobServices.getAllJobs();
    res.status(200).json({ jobs });
  }
  catch (error) {
    next(error);
  }
}

module.exports.getJobById = async (req, res, next) => {
  const jobId = req.params.jobId
  try
  {    const job = await jobServices.getJobsbyId(jobId)
    if(!job)
    {
      return res.status(404).json({message : "Job Not Found"})
    }
    res.status(200).json({ job });
  }
  catch (error) {
    next(error);
  }
}

