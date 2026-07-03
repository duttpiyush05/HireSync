const jobModel = require('../models/job_model')
const {validationResult} = require('express-validator')
const jobServices = require('../services/job_services')
const NotificationModel = require('../models/notification_model')

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

  const notificationForClient = await  NotificationModel.create({
    user : client._id,
    title : "New Job Created",
    message : "A new job successfully created and will be shown to freelancers"
  })

  res.status(201).json({message : "Job Created Successfully", job, notificationForClient})
}

module.exports.getMyJobs = async (req, res, next) => {
  try
  {
    const jobs = await jobServices.getMyJobs(req);    
    res.status(200).json({ jobs });
  }
  catch (error) {
    next(error);
  }
}

module.exports.getAllJobs = async (req, res, next) => {
  try
  {  
     const page = Number(req.query.page) || 1
    const jobs = await jobServices.getAllJobs(req.user._id, page);
    res.status(200).json({ jobs });
  }
  catch (error) {
    res.status(401).json({message : error.message});
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

