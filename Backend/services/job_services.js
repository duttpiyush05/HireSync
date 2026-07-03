const jobModel = require('../models/job_model');
const proposalModel = require('../models/proposals')

exports.createJob = async (jobData) => {
  const job = new jobModel(jobData);
  return await job.save();
};

module.exports.getMyJobs = async (req) => {  
  const clientId = req?.user?._id
  const page = Number(req?.query?.page)||1
  
  const limit = 5
  try {
    const jobs = await jobModel.aggregate([
  {
    $match: {
      client: clientId
    }
  },
  {
    $lookup: {
      from: "proposals",
      localField: "_id",
      foreignField: "job",
      as: "proposals"
    }
  },
  {
    $addFields: {
      proposalsCount: {
        $size: "$proposals"
      }
    }
  },
  {
    $project: {
      proposals: 0   // Remove the proposals array
    }
  },
  {
    $sort: {
      createdAt: -1
    }
  },
  {
    $skip: (page - 1) * limit
  },
  {
    $limit: limit
  }
]);
    const totalJobs = await jobModel.
    countDocuments({ client: clientId })
    return {jobs,
      totalJobs,
    totalPages : Math.ceil(totalJobs/limit)};
  } catch (error) {
    throw error;
  }
};

module.exports.getAllJobs = async (id, page) => {
  try {
    const limit = 9
    const proposals = await proposalModel.find({
      freelancer : id
    })
    const appliedJobIds = proposals.map(proposal=> proposal.job)
    const jobs = await jobModel.
    find({
      _id : {$nin : appliedJobIds}
    }).
    populate('client', 'fullname').
    sort({ createdAt: -1 }).
    skip((page-1)*limit).
    limit(limit)
    const totalJobs = await jobModel.countDocuments({
      status:"open"
    })

    return {jobs,
      totalJobs,
      totalPages : Math.ceil(totalJobs/limit)
    };
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