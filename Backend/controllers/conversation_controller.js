const conversationModel = require('../models/conversation_model')
const messageModel = require('../models/message_model')
const contractModel = require('../models/contracts_model')

const {userToSocket} = require('../onlineUsers')

module.exports.getInfoForMessage = async(req, res, next)=>
{
  const contractId = req?.params?.contractId
  const role = req.role
  try
  {
    const contract = await contractModel.findById(contractId).
    populate('client').
    populate('freelancer')

    let convo = await conversationModel.findOne({
      contract : contractId
    })
    if(!convo)
    {
      convo = await conversationModel.create({
      client:contract.client._id,
      freelancer:contract.freelancer._id,
      contract :  contractId,
      lastMessage : "",
      lastMessageAt:null
      })
      return res.status(201).json({contract, role, convo})      
    }
    return res.status(201).json({contract, role, convo})
  }
  catch(error)
  {
    res.status(401).json({message : error?.message})
  }
}

module.exports.getStatus = async(req, res, next)=>
{
  const receiverId = req?.params?.receiverId  
  try
  {
    res.status(201).json({isOnline : userToSocket.has(receiverId)})
  }
  catch(error)
  {
    res.status(400).json({message : error?.message})
  }
}



