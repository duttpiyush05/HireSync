const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
  job:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'jobmodel'
  },

  proposal:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'proposals'
  },

  client:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'clients'
  },

  freelancer:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'freelancers'
  },
  budget:Number,

  startDate:Date,

  expectedCompletion:String,

  status:{
    type:String,
    enum:[
      'active',
      'requested_completion',
      'completed',
      'cancelled'
    ],
    default:'active'
  },
  cReview : {
    type : Boolean,
    default : false,
  },
  fReview : {
    type : Boolean,
    default : false,
  }
},{timestamps : true})

const contractModel = mongoose.model('contracts', contractSchema)
module.exports = contractModel