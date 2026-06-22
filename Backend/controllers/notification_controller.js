const notificationModel = require('../models/notification_model')

module.exports.getNotifications = async(req,res,next)=>
{
  console.log(req.user._id);
  
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

module.exports.markAllasRead = async(req, res, next) =>
{
  try{
       await notificationModel.updateMany(
      {
      user : req.user._id,
      },
      {
         isRead : true
      })

      const notifications = await notificationModel.
      find({user : req.user._id}).
      sort({createdAt : -1})

    res.status(201).json({notifications})
  }catch(error)
  {
    res.status(400).json({message : error.message})
  }
}

module.exports.getunreadcount = async(req, res, next)=>
{
  console.log(req.user._id);  
  try
  {
    const count = await notificationModel.countDocuments({
      user :req.user._id,
      isRead : false
    })
    
    res.status(201).json({count})
  }
  catch(error)
  {
    res.status(401).json({message : error.message})
  }
}