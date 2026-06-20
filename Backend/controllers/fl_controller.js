const freelancerModel = require('../models/fl_model')
const blacklistTokenModel = require('../models/blackListTokenModel')
const {validationResult} = require('express-validator')
const freelancerServices = require('../services/freelancer_services')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res, next) =>
{
  const error = validationResult(req)
  if(!error.isEmpty())
  {
    return res.status(400).json({message : error.array()})
  }

  const {fullname, email, password, contactno, gender} = req.body;

  const isFreelancer = await freelancerModel.findOne({email})
  if(isFreelancer)
  {
    return res.status(400).json({message : "User Already exists"})
  }

  const hashedPassword = await freelancerModel.hashPassword(password)

  const freelancer = await freelancerServices.createFreelancer({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email : email,
    password : hashedPassword,
    contactno : contactno,
    gender : gender
  })

  const token = await freelancer.generateToken()
  res.cookie('token', token)
  res.status(201).json({token, freelancer})
}

module.exports.login = async (req, res, next) =>
{
  const error = validationResult(req)
  if(!error.isEmpty())
  {
    return res.status(401).json({"error" : error})
  }

  const {email, password} = req.body
  
  const freelancer = await freelancerModel.findOne({email})
  if(!freelancer)
  {
    return res.status(401).json({message : "Invalid Credentials"})
  }

  const ismatched = await freelancer.comparePassword(password)
  if(!ismatched)
  {
     return res.status(401).json({message : "Invalid Credentials"})
  }

  const token = freelancer.generateToken()
  res.cookie('token', token)
  res.status(200).json({token, freelancer})
}

module.exports.logout = async (req, res, next)=>
{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

  await blacklistTokenModel.create({token})
  res.clearCookie(token)

  res.status(200).json({message : "Logout Successfully"})
}

module.exports.getprofile = (req, res, next)=>
{
  res.status(200).json({freelancer : req.user})
}
module.exports.getfreelancerbyId = async (req, res, next)=>
{
    const id = req.params.freelancerId

    const freelancer = await freelancerModel.findById(id)
    res.status(201).json({freelancer})
}

module.exports.updateProfile = async(req, res, next)=>
{
  try {
    const freelancer = await freelancerModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: req.body
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      freelancer
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}