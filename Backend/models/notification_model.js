const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
  user : {
    type : mongoose.Types.ObjectId,
    required : true,
  },
  contract_id : {
    type : mongoose.Types.ObjectId,
    ref : 'contracts'
  },
  title : {
    type :String,
    required : true,
  },
  message : {
    type : String,
    required : true,
  },
  isRead : {
    type : Boolean,
    default : false,
  } 
}, {timestamps : true})

module.exports = mongoose.model('notifications', notificationSchema)