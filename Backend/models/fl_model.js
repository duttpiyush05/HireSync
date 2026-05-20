const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const freelancerSchema = new mongoose.Schema({
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

})

freelancerSchema.methods.generateToken = function()
{
  const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn:'24h'})
  return token
}

freelancerSchema.statics.hashPassword = async function (password)
{
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

freelancerSchema.methods.comparePassword = async function (password)
{
  return await bcrypt.compare(password, this.password)
}

const freelancerModel = mongoose.model('freelancer', freelancerSchema)
module.exports = freelancerModel
