const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
  client : 
  {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'clients'
  },
  freelancer : 
  {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'freelancers'
  },
  contract : 
  {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'contracts'
  },
  lastMessage : 
  {
    type : String,
  },
  lastMessageAt : 
  {
    type : Date,
  }
},{timestamps : true})

module.exports = mongoose.model('conversations', conversationSchema)