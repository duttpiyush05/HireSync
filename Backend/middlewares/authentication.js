const freelancerModel = require('../models/fl_model')
const clientModel = require('../models/client_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const blacklistToken = require('../models/blackListTokenModel')

module.exports.authFreelancer = async (req, res, next)=>
{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  if(!token)
  {
    return res.status(401).json({message : "Login Required"})
  }

  const isblackListToken = await blacklistToken.findOne({token})

  if(isblackListToken)
  {
    return res.status(401).json({message : "Unauthorized User"})
  }

  try
  {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const freelancer = await freelancerModel.findById(decoded._id)
    if(!freelancer)
    {
      return res.status(401).json({message : "Unauthorized User"})
    }
    req.user = freelancer
    return next()
  } catch(err)
  {
    return res.status(401).json({message : "Unauthorized User"})
  }
}

module.exports.authClient = async (req, res, next) =>
{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  if(!token)
  {
    return res.status(401).json({message: "Login Required"})
  }

  const isblackListToken = await blacklistToken.findOne({token})
  
  if(isblackListToken)
  {
    return res.status(401).json({message : "Unauthorized User"})
  }

   try
   {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const client = await clientModel.findById(decoded._id)

    if(!client)
    {      
      return res.status(401).json({message : "Unauthorized User"})
    }

    req.user = client;
    return next()
   }catch(err)
   {
    return res.status(401).json({message : "Unauthorized User"})
   }
}

module.exports.authUser = async(req,res,next)=>
{
  
  try{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  if(!token)
  {
    return res.status(401).json({message: "Login Required"})
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  let user = null

  user = await freelancerModel.findById(decoded._id)

  if(!user)
  {
    user = await clientModel.findById(decoded._id)
  }

  if(!user){
    return res.status(401).json({message : "User not found"})
  }

  req.user = user
  next()
  }
  catch(error)
  {
    return res.status(401).json({message : error.message})
  }
}