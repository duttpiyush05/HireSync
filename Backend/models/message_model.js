const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  conversation : 
  {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'conversations'
  },
  sender : 
  {
    type : mongoose.Schema.Types.ObjectId,
    required:true
  },
  text : 
  {
    type : String,
  },
  status : {
    type : String,
    enum : ['sent','read','delivered'],
    default : 'sent',
  }
},{timestamps : true})

module.exports = mongoose.model('messages', messageSchema)