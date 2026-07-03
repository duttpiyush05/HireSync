const contractModel = require('../models/contracts_model')
const notificationModel = require('../models/notification_model')
const { getIO } = require("../socket");
const { userToSocket } = require("../onlineUsers");

const emitNotification = (userId, notification) => { 
  const io = getIO();
  const receiverSocket = userToSocket.get(userId.toString());
  if (receiverSocket) {
    io.to(receiverSocket).emit("new-notification", { notification });
  }
}

module.exports.getAllContracts = async(req, res) =>
{
  const page = Number(req.query.page)||1
  // console.log(page);
  const limit = 5
  try
  {
    if(req.role==="freelancer")
    {
      const role = "freelancer"
      const contracts = await contractModel.
                          find({
                            freelancer : req.user._id
                          }).
                          skip((page-1)*limit).
                          limit(limit).
                          populate('client').
                          populate('freelancer').
                          populate('job').
                          populate('proposal') 
      const totalContracts = await contractModel.
                          countDocuments({
                            freelancer : req.user._id
                          })        

      return res.status(201).json({contracts, 
        role,
        totalContracts,
        totalPages:Math.ceil(totalContracts/limit)})
    }
    if(req.role==="client")
    {
      const role = "client"
      const contracts = await contractModel.
                          find({
                            client : req.user._id
                          }).
                          skip((page-1)*limit).
                          limit(limit).
                          populate('client').
                          populate('freelancer').
                          populate('job').
                          populate('proposal')
      const totalContracts= await contractModel.countDocuments({
                                  client : req.user._id
                                })   

      res.status(201).json({contracts, 
        role,
      totalContracts,
    totalPages : Math.ceil(totalContracts/limit)})
    }
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
    let role = "client"
    if(req.role==="freelancer") role= "freelancer"

    res.status(201).json({contract, role})

  }catch(error)
  {
    res.status(401).json({message : error.message})
  }
}

module.exports.completionRequest = async(req, res, next) =>
{
  try{
    const contractId = req.params.contractId

    const contract = await contractModel.findById(contractId)

    if(!contract)
    {
      return res.status(401).json({message : "Contract not exists"})
    }

    if(contract.status==="requested_completion"){
      res.status(401).json({message : "Completion Already Requested"})
    }

    contract.status= "requested_completion"
    await contract.save()

    const notificationForClient = await notificationModel.create({
      user : contract?.client,
      title :"Contract Completion Request",
      message: "A new Contract Completion Request",
      contract_id : contractId,
    })

    emitNotification(contract?.client, notificationForClient)

    const notificationForFreelancer = await notificationModel.create({
      user : contract?.freelancer,
      title :"Contract Completion Requested",
      message: "A new Contract Completion Requested"
    })

    emitNotification(contract?.freelancer, notificationForFreelancer)

    res.status(201).json({contract, notificationForClient, notificationForFreelancer})
  }catch(error)
  {
    res.status(401).json({message : error.message})
  }
}

module.exports.markCompleted = async(req, res, next) =>
{
  try{
    const contractId = req.params.contractId

    const contract = await contractModel.findById(contractId)

    if(!contract)
    {
      return res.status(401).json({message : "Contract not exists"})
    }

    if(contract.status==="completed"){
      res.status(401).json({message : "Completion Already Completed"})
    }

    contract.status= "completed"
    await contract.save()

    const notificationForFreelancer = await notificationModel.create({
      user : contract?.freelancer,
      title :"Contract Completed",
      message: "Contract Completion Request has been Approved by client and mark Completed Sucessfully"
    })

    emitNotification(contract?.freelancer, notificationForFreelancer)

    res.status(201).json({contract, notificationForFreelancer})
  }catch(error)
  {
    res.status(401).json({message : error.message})
  }
}

module.exports.markCancel = async(req, res, next) =>
{
  try{
    const contractId = req.params.contractId

    const contract = await contractModel.findById(contractId)

    if(!contract)
    {
      return res.status(401).json({message : "Contract not exists"})
    }

    if(contract.status==="cancelled"){
      res.status(401).json({message : "Completion Already Completed"})
    }

    contract.status= "cancelled"
    await contract.save()

    const notificationForFreelancer = await notificationModel.create({
      user : contract?.freelancer,
      title :"Contract Cancelled",
      message: "Contract Cancelled by the Client"
    })

    emitNotification(contract?.freelancer, notificationForFreelancer)

    res.status(201).json({contract, notificationForFreelancer})
  }catch(error)
  {
    res.status(401).json({message : error.message})
  }
}