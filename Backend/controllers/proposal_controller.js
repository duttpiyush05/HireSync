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

