const mongoose = require('mongoose')

const blackListTokenModel = new mongoose.Schema({
  token : {
    type: String,
    required : true,
    unique : true
  },

  blackListedAt : {
    type : Date,
    default : Date.now(),
    expires : 86400
  }
})

module.exports = mongoose.model('blackListToken', blackListTokenModel)