const jobModel = require('../models/job_model')
const {validationResult} = require('express-validator')
const jobServices = require('../services/job_services')
const NotificationModel = require('../models/notification_model')
const { getIO } = require("../socket")
const { userToSocket } = require("../onlineUsers")
const { Types } = require('mongoose')

const emitNotification = (userId, notification) => { 
  const io = getIO();
  const receiverSocket = userToSocket.get(userId.toString());
  if (receiverSocket) {
    io.to(receiverSocket).emit("new-notification", { notification });
  }
}

module.exports.createJob = async (req, res, next) =>
{
  const error = validationResult(req)
  if(!error.isEmpty())
  {    
    return res.status(401).json({message : error.array()})
  } 
  const {title, category, description, skills, budget} = req.body
 const existingJob = await jobModel.findOne({
    client: req.user._id,
    title: {
        $regex: new RegExp(`^${title.trim()}$`, "i")
    },
    status: {
        $in: ["open", "in_progress"]
    },
    category:category
})

if(existingJob) return res.status(409).json({message:"This Job Already Exists"})

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
  emitNotification(client._id, notificationForClient)

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
module.exports.getJobInfo = async (req, res, next) => {
  try
  {
    const jobs = await jobServices.getJobInfo(req);    
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
  {
    const job = await jobServices.getJobsbyId(jobId)
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

module.exports.closeJob = async(req, res, next)=>
{
  const jobId = req.params.jobId 

  await jobModel.findOneAndUpdate({
    _id: jobId
  },
  {
    status:'closed'
  })
  res.status(201).json({message:"job Closed Successfully"})
}

module.exports.updateJob = async(req, res, next)=>
{
  const jobId = req?.params?.jobId
  try
  {
    const updatedJob = await jobModel.findByIdAndUpdate(jobId,
  {
    title:req.body.title,
    category:req.body.category,
    description:req.body.description,
    skills:req.body.skills,
    budget :{
      type : req.body.compensationType,
      duration:req.body.duration,
      minbudget:req.body.hourlyMin,
      maxbudget:req.body.hourlyMax,
      xplevel : req.body.xplevel
    }
  },
{
  new:true,
  runValidators:true
})

  res.status(201).json({updatedJob})
  }
  catch(err)
  {
    res.status(401).json({message : err?.message})
  }
}
