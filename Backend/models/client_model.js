const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const clientSchema = new mongoose.Schema({
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
  profilePicture: {
      type: String,
    },
    github: {
      type: String,
      default :''
    },
    linkedin: {
      type: String,
      default :''
    },
    location : {
      type: String,
      default :'Delhi'
    },
    bio : {
      type: String,
      default :''
    },
  companyProfile: {
    companyName: 
    {
      type:String,
      default : 'X'
    },
    description: 
    {
      type:String,
      default : 'Y'
    },
    website: 
    {
      type:String,
      default : 'Z'
    }
  }
})

clientSchema.methods.generatetoken = function ()
{
  const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET,{expiresIn: '24h'})
  return token
}

clientSchema.statics.hashPassword = async function (password)
{
  const hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

clientSchema.methods.comaparePassword = async function (password)
{
  return await bcrypt.compare(password, this.password)
}

const clientModel = mongoose.model('clients', clientSchema)
module.exports =  clientModel
