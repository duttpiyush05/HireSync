const notificationModel = require('../models/notification_model')

module.exports.getNotifications = async(req,res,next)=>
{
  try{
    const notifications = await notificationModel.find(
      {
        user : req.user._id
      }
    ).sort({createdAt : -1})
    res.status(201).json({notifications})
  }catch(error)
  {
    res.status(501).json({message: error.message})
  }
}