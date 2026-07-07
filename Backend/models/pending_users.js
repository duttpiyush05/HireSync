const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const pendingUserSchema = new mongoose.Schema({
  fullname :{
    firstname:{
      type : String,
      required : true,
      minlength : [3, "Firstname must be atleast of 3 character"]
    },
    lastname :{
      type : String,
    }
  },

  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true
  },

  password : {
    type : String,
    required : true,
    minlength : [6, "Password must be Atleast 6 character"],
  },

  contactno : {
    type : String,
    required : true,
    maxlength : [10, "Please Enter Valid Number"],
    minlength : [10, "Please Enter Valid Number"],
  },

  gender : {
    type : String,
    enum : ['Male', 'Female', 'Other'],
    required : true
  },
  role:{
    type : String,
    enum:['client', 'freelancer'],
    required:true
  },
  otp:{
    type : String,
    required:true
  },
  otpExpire:{
    type : Date,
    required:true
  },
  lastOtpSentAt: {
    type: Date,
    default: Date.now
}
},{timestamps:true})

pendingUserSchema.statics.hashPassword = async function (password)
{
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

const pendingUserModel = mongoose.model('pendingUser', pendingUserSchema)
module.exports = pendingUserModel