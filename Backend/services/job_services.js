const jobModel = require('../models/job_model');

exports.createJob = async (jobData) => {
  const job = new jobModel(jobData);
  return await job.save();
};
