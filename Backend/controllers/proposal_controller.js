const proposalModel = require('../models/proposals');
const jobModel = require('../models/job_model')
const contractModel = require("../models/contracts_model")
const notificationModel = require("../models/notification_model")

module.exports.createProposal = async (req, res, next) => {
  try
  {
    const{
      coverLetter,
      estCompletion,
      askingAmt,
      platformFee,
      receivingAmt,
    } = req.body

    const existingProposal = await proposalModel.findOne({
      job: req.params.jobId,
      freelancer: req.user._id
    });

    if (existingProposal) {
      return res.status(400).json({
        message: "You have already applied to this job"
      });
    }

    const job = await jobModel.findById(req.params.jobId)

    const proposal = await proposalModel.create({
      coverLetter,
      portfolio:req.file ? {
        filename : req.file.originalname,
        fileUrl : req.file.path,
        fileType: req.file.mimetype
      } : undefined,
      estCompletion,
      job : req.params.jobId,
      client : job.client,
      freelancer : req.user._id,
      askingAmt,
      platformFee,
      receivingAmt,
    })

    //forClient
    const notificationForClient = await notificationModel.create({
      user : job.client,
      title : "New Proposal",
      message : "You Received a new Proposal"
    })

    const notificationForFreelancer = await notificationModel.create({
      user : req.user._id,
      title : "Proposal Submitted",
      message : "Proposal submitted Successfully"
    })

    res.status(201).json({proposal})
  } catch(error)
  {
    res.status(401).json("There is some error")
    console.log(error)
    next(error)
  }
};

module.exports.getProposalInfo = async (req, res, next)=>
{
  const proposalId = req.params.proposalId
  try
  {
    const proposal = await proposalModel.findById(proposalId)
    if(!proposal)
    {
      return res.status(404).json({message : "Proposal Not Found"})
    }
    res.status(201).json({proposal})
  }
  catch(error)
  {
    next(error)
  }
}
module.exports.getProposalsforClient = async (req, res, next)=>
{
  const page = Number(req.query.page)||1
  const limit = 6

  try {
    const proposals = await proposalModel
      .find({ 
        client: req.user._id,
        status:"pending"
      })
      .populate('freelancer')
      .populate('job').
      skip((page-1)*limit).
      limit(limit)

    const countProposals = await proposalModel
      .countDocuments({ 
        client: req.user._id ,
        status:"pending"
      })

    res.status(200).json({
      proposals,
      countProposals, 
      totalPages: Math.ceil(countProposals/limit)
    });
  } catch (error) {
    next(error);
  }
}

module.exports.updateProposalStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const proposal = await proposalModel.findById(
      req.params.proposalId
    );

    if (!proposal) {
      return res.status(404).json({
        message: "Proposal not found"
      });
    }

    if (proposal.status === "accepted") {
      return res.status(400).json({
        message: "Proposal already accepted"
      });
    }

    proposal.status = status;
    await proposal.save();

    if (status === "accepted") {

      const notificationForFreelancer = await notificationModel.create({
      user : proposal.freelancer,
      title : "Proposal Accepted",
      message : "Your Proposal Successfully Accepted"
    })

      const existingContract = await contractModel.findOne({
        proposal: proposal._id
      });

      if (existingContract) {
        return res.status(400).json({
          message: "Contract already exists"
        });
      }

      await proposalModel.updateMany(
        {
          job: proposal.job,
          _id: { $ne: proposal._id }
        },
        {
          status: "rejected"
        }
      );

      await jobModel.findByIdAndUpdate(
        proposal.job,
        {
          status: "in_progress"
        }
      );

      const contract = await contractModel.create({
        proposal: proposal._id,
        job: proposal.job,
        client: proposal.client,
        freelancer: proposal.freelancer,
        budget: proposal.receivingAmt,
        startDate: Date.now(),
        expectedCompletion: proposal.estCompletion,
        status: "active"
      });

      const notificationContract = await notificationModel.create({
      user : proposal.freelancer,
      title : "Contracted Created",
      message : "A new Contract has been Created"
    })

      return res.status(200).json({
        message: "Proposal successfully accepted",
        proposal,
        contract,
        notificationContract,
        notificationForFreelancer
      });
    }

    const notificationForFreelancer = await notificationModel.create({
      user : proposal.freelancer,
      title : "Proposal Rejected",
      message : "Your Proposal was Rejected"
    })

    res.status(200).json({
      message: `Proposal successfully ${status}`,
      proposal,
      notificationForFreelancer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports.getFreelancerProposal= async(req, res, next)=>
{ 
  try
  {
    const jobs = await proposalModel.find({
      freelancer : req.user._id
    }).populate('job').populate('client')
    res.status(201).json({jobs})

  }catch(err)
  {
    res.status(401).json({message: err?.message})
  }
}