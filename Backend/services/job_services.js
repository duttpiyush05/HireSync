const jobModel = require('../models/job_model');

exports.createJob = async (jobData) => {
  console.log("inside services : ", jobData)
  const job = new jobModel(jobData);
  return await job.save();
};

module.exports.getMyJobs = async (clientId) => {
  try {
    const jobs = await jobModel.find({ client: clientId }).sort({ createdAt: -1 });
    return jobs;
  } catch (error) {
    throw error;
  }
};

module.exports.getAllJobs = async () => {
  try {
    const jobs = await jobModel.find().populate('client', 'fullname').sort({ createdAt: -1 });
    return jobs;
  } catch (error) {  
  throw error;
  }
}

module.exports.getJobsbyId = async (jobId) => {
  try
  {    const job = await jobModel.findById(jobId).populate('client', 'fullname');
    return job;
  } catch (error) {
    throw error;
  }   
}