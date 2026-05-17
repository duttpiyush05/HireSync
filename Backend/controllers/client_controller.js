const clientModel = require('../models/client_model')
const clientServices = require('../services/client_services')
const blacklistTokenModel = require('../models/blackListTokenModel')
const {validationResult} = require('express-validator')
const clienServices = require('../services/client_services')

module.exports.register = async (req, res, next) =>
{
  const error = validationResult(req);
  if(!error.isEmpty())
  {
    return res.status(401).json({message : error.array()})
  }
  const {fullname, email, password, contactno, gender} = req.body
  
  const isClient = await clientModel.findOne({email})
  if(isClient)
  {
    return res.status(401).json({message : "User Already Exists"})
  }

  const hashedPassword = await clientModel.hashPassword(password)

  const client = await clienServices.create({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email : email,
    password : hashedPassword,
    contactno : contactno,
    gender :  gender
  })

  const token = client.generatetoken()
  res.cookie('token')
  res.status(201).json({token, client})
}

module.exports.login = async (req, res, next) =>
{
  const error = validationResult(req)
  if(!error.isEmpty())
  {
    return res.status(401).json({error : error.array()})
  }

  const {email, password} = req.body

  const client = await clientModel.findOne({email})
  if(!client)
  {
    return res.status(401).json({message : "Invalid Credentails"})
  }

  const passwordMatch = client.comaparePassword(password)
  if(!passwordMatch)
  {
    return res.status(401).json({message : "Invalid Credentails"})
  }

  const token = client.generatetoken()
  res.cookie('token', token)
  res.
  res.status(201).json({token, client})
}

module.exports.logout = async (req, res, next) =>
{
  const token = req.cookie.token || req.headers.authorization?.split(' ')[1]
  if(!token)
  {
    return res.status(401).json({message : "Login Required"})
  }
  await blacklistTokenModel.create({token})

  req.clearCookie(token)
  res.status(200).json({message : "Logout Successfully"})
}

module.exports.getprofile = (req, res, next) =>
{
  res.status(200).json({client : req.user})
}

