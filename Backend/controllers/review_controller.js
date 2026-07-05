const contractModel = require('../models/contracts_model')
const freelancerModel = require('../models/fl_model')
const clientModel = require('../models/client_model')
const reviewModel = require('../models/review_model')
const notificationModel = require('../models/notification_model')
const { getIO } = require("../socket");
const { userToSocket } = require("../onlineUsers")

const emitNotification = (userId, notification) => { 
  const io = getIO();
  const receiverSocket = userToSocket.get(userId.toString());
  if (receiverSocket) {
    io.to(receiverSocket).emit("new-notification", { notification });
  }
}

module.exports.leaveReviews = async(req, res, next)=>
{
  try
  {
    const contractId = req.params.contractId
    const userId = req.user._id
    const role = req.role

    const contract = await contractModel.findById(contractId).
    populate('client').
    populate('freelancer')

    res.status(201).json({contract, role})
  }catch(error)
  {
    res.status(401).json({messgae: error?.messgae})
  }
}

module.exports.postReview = async(req, res, next)=>
{
  const {contract, reviewee, reviewer, rating, review} = req.body  
  const role = req.role
  if(role==="freelancer")
  {
    await contractModel.updateOne(
      {
        _id : contract,
      },
      {
        $set : {fReview : true}
      }
    )
  }
  if(role==="client")
  {
    await contractModel.updateOne(
      {
        _id : contract,
      },
      {
        $set : {cReview : true}
      }
    )
  }
  try
  {
    const newReview = await reviewModel.create({
      contract,
      reviewee,
      reviewer,
      rating,
      review,
    })

    if(role==="freelancer")
    {
      const notificationForFreelancer = await notificationModel.create({
        user : req.user._id,
        title: "Review Submitted",
        message : "Review Successfully Submitted",
        contract_id : contract
      })
      emitNotification(req.user._id, notificationForFreelancer)
      res.status(201).json({newReview})
    }
    if(role==="client")
    {
      const notificationForClient = await notificationModel.create({
        user : req.user._id,
        title: "Review Submitted",
        message : "Review Successfully Submitted",
        contract_id : contract
      })
      emitNotification(req.user._id, notificationForClient)
      res.status(201).json({newReview})
    }
    
  }catch(error)
  {
    res.status(401).json({messgae: error?.messgae})
  }

}