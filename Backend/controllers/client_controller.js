const clientModel = require('../models/client_model')
const clientServices = require('../services/client_services')
const blacklistTokenModel = require('../models/blackListTokenModel')
const {validationResult} = require('express-validator')
// const clientServices = require('../services/client_services')
const jobModel = require('../models/job_model')
const proposalModel = require('../models/proposals')
const contractModel = require('../models/contracts_model')
const notificationModel = require('../models/notification_model')
const { path } = require('../app')

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
    return res.status(400).json({message : "User Already Exists"})
  }

  const hashedPassword = await clientModel.hashPassword(password)

  const client = await clientServices.createClient({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email : email,
    password : hashedPassword,
    contactno : contactno,
    gender :  gender
  })

  const token = await client.generatetoken()
  res.cookie('token', token)
  res.status(201).json({token, client})
}

module.exports.login = async (req, res, next) =>
{
  const error = validationResult(req)
  if(!error.isEmpty())
  {    
    return res.status(401).json({errors : error.array()})
  }

  const {email, password} = req.body

  const client = await clientModel.findOne({email})
  if(!client)
  {
    return res.status(401).json({message : "Invalid Credentails"})
  }

  const passwordMatch = await client.comaparePassword(password)
  if(!passwordMatch)
  {
    return res.status(401).json({message : "Invalid Credentails"})
  }

  const token = client.generatetoken()
  res.cookie('token', token)
  res.status(201).json({token, client})
}

module.exports.logout = async (req, res, next) =>
{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
  await blacklistTokenModel.create({token})

  res.clearCookie(token)
  res.status(200).json({message : "Logout Successfully"})
}

module.exports.getprofile = async (req, res, next) =>
{
  const activeJobs = await jobModel.countDocuments({client : req.user._id, status : "open"})
  const activeContractsCount = await contractModel.countDocuments({client : req.user._id, status : "active"})
  const activeContracts = await contractModel.find({client : req.user._id, status : "active"}).populate('freelancer').populate('job').populate('proposal').sort({createdAt: -1}).limit(3)
  const completedContracts = await contractModel.countDocuments({client : req.user._id, status : "completed"})
  const pendingProposals = await proposalModel.find({client : req.user._id, status : "pending"}).sort({createdAt: -1}).limit(3).
  populate('job').
  populate({
    path: 'freelancer',
    select : 'fullname profile.profilePicture'
  })
  const totalSpent = await contractModel.aggregate([
    {
      $match: {
        client: req.user._id,
        status: "completed"
      }
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$budget" }
      }
    }
  ])
  const notifications = await notificationModel.
  find({user: req.user._id}).
  sort({createdAt: -1}).
  limit(3).
  populate({
    path: 'contract_id',
    populate: [
      {
        path: 'freelancer',
      }
    ]
  })
  const spent = totalSpent.length > 0 ? totalSpent[0].totalAmount : 0
  res.status(200).json({user : req.user, activeJobs,activeContractsCount, pendingProposals, activeContracts, completedContracts, spent, notifications})
}

module.exports.getClientbyId = async (req, res, next) =>
{
  const id = req.params.clientId
  
      const client = await clientModel.findById(id)
      const totalJobs = await jobModel.countDocuments({client:id})
      res.status(201).json({client, totalJobs})
}

module.exports.updateProfile = async(req, res, next) =>{    
  try {
    const updateData = {
            "fullname.firstname": req.body.firstname,
            "fullname.lastname": req.body.lastname,

            "email": req.body.email,
            "contactno": req.body.contactno,
            "gender": req.body.gender,
            "github": req.body.github,
            "linkedin": req.body.linkedin,
            "location": req.body.location,
            "bio": req.body.bio,
            "companyProfile.companyName": req.body.companyName,
            "companyProfile.description": req.body.description,
            "companyProfile.website": req.body.website,
        }
        if (req.file) {
            updateData["profilePicture"] = req.file.filename;
        }

      const client = await clientModel.findByIdAndUpdate(
        req.user._id,
        {
          $set: updateData
        },
        {
          returnDocument: 'after',
          runValidators: true
        }
      );
  
      res.status(200).json({
        message: "Profile updated successfully",
        client
      });
  
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
}
