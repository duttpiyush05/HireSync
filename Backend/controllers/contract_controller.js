const contractModel = require('../models/contracts_model')

module.exports.getAllContracts = async(req, res) =>
{
  try
  {
    const contracts = await contractModel.
                          find().
                          populate('client').
                          populate('freelancer').
                          populate('job').
                          populate('proposal')

  res.status(201).json({contracts})
  }catch(error)
  {
    res.status(400).json({message : error.message})
  }
}

module.exports.getContractbyId = async(req,res)=>
{
  const id = req.params.contractId
  try
  {
    const contract = await contractModel.findById(id).
                                        populate("client").
                                        populate("job").
                                        populate("freelancer").
                                        populate("proposal")

    res.status(201).json({contract})

  }catch(error)
  {
    res.status(500).json({message : error.message})
  }
}