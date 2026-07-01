const conversationModel = require('../models/conversation_model')
const messageModel = require('../models/message_model')
const notificationModel = require('../models/notification_model')
const {getIO}  = require('../socket')

module.exports.postMessage = async(req ,res, next)=>
{
  const convoId = req?.params?.convoId  
  const {messageText} = req.body 
  
  try
  {
    const newMessage = await messageModel.create({
      conversation:convoId,
      sender :  req.user._id,
      text:messageText
    })

    await newMessage.save()
    
    const convo = await conversationModel.
    findByIdAndUpdate(convoId, {
      lastMessage : newMessage.text,
      lastMessageAt : newMessage.createdAt
    })  

        const io = getIO()
    io.to(convoId).emit("receive-message", newMessage)

    await convo.save()

    // if(req.role==="client")
    // {
    //   await notificationModel.create({
    //     user : convo.freelancer,
    //     title : "New Message",
    //     message : "You have a mnw Message..."
    //   })
    // }
    // if(req.role==="freelancer")
    // {
    //   await notificationModel.create({
    //     user : convo.client,
    //     title : "New Message",
    //     message : "You have a new Message..."
    //   })
    // }
    res.status(201).json({newMessage})
  }
  catch(error)
  {
    res.status(401).json({message:  error?.message})
  }
}

module.exports.getMessages = async(req, res, next)=>
{ 
  const convoId = req?.params?.convoId    
  const userId = req?.user?._id
  try
  {
    const messages = await messageModel.find({
    conversation : convoId,
    })
    res.status(201).json({messages, userId})
  }
  catch(error)
  {
    res.status(401).json({message : error?.message})
  }
}