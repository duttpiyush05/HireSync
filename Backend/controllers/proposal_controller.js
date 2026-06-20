const proposalModel = require('../models/proposals');
const jobModel = require('../models/job_model')

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

    res.status(201).json({alert : "Proposal submitted successfully", proposal})
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
  try {
    const proposals = await proposalModel
      .find({ client: req.user._id })
      .populate('freelancer')
      .populate('job');

    res.status(200).json({
      proposals
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

    const proposal = await proposalModel.findByIdAndUpdate(
      req.params.proposalId,
      {
        $set: { status }
      },
      {
        returnDocument: 'after'
      }
    );
    
    res.status(200).json({
      message : `Proposal Sucessfully ${status}`,
      proposal
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};