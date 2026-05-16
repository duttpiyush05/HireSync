const freelancerModel = require('../models/fl_model')
const clientModel = require('../models/client_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const blackListTokenModel = require('../models/blackListToken')

module.exports.authFreelancer = async (req, res, next)=>
{
  const token = req.cookies.token || req.headers.authentication?.split(' ')[1]

  if(!token)
  {
    return res.status(401).json({message : "Login Required"})
  }

  const isblackListToken = await blackListToken.findOne({token})
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

module.exports.authClient = async(req, res, next) =>
{
  const token = req.cookies.token || req.headers.authentication?.split(' ')[1]
  if(!token)
  {
    return res.status(401).json({message: "Login Required"})
  }
  const isblackListToken = await blackListToken.findOne({token})
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