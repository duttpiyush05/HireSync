const freelancerModel = require('../models/fl_model')
const contractModel = require('../models/contracts_model')
const notificationModel = require('../models/notification_model')
const jobModel = require('../models/job_model')
const proposalModel = require('../models/proposals')
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
    return res.status(401).json({errors:error.array()})
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

module.exports.getprofile = async(req, res, next)=>
{
  const activeContractsCount = await contractModel.
  countDocuments({freelancer : req.user._id, status : "active"})
    const activeContracts = await contractModel.find({freelancer : req.user._id, status : "active"}).populate('client').populate('job').populate('proposal').sort({createdAt: -1}).limit(3).
  populate('freelancer')
    const pendingProposalsCount = await proposalModel.countDocuments({freelancer:req.user._id, status:'pending'})
    const completedContractsCount = await contractModel.countDocuments({freelancer:req.user._id, status:'completed'})
    const pendingProposals = await proposalModel.find({freelancer:req.user._id, status:'pending'}).
    populate({
      path:  'client',
      select: 'fullname companyProfile.companyName'
    }).populate({
      path : 'job',
      select : 'title'
    })
    const totalSpent = await contractModel.aggregate([
        {
          $match: {
            freelancer: req.user._id,
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
              path: 'client',
            }
          ]
        })
      const spent = totalSpent.length > 0 ? totalSpent[0].totalAmount : 0

      const jobs = await jobModel.find({
        status:'open'
      }).
      sort({createdAt : -1}).
      limit(3).
      populate({
        path:'client',
        select:'companyProfile.companyName'
      })

  res.status(200).json({activeContractsCount, activeContracts,pendingProposalsCount,pendingProposals,completedContractsCount, spent, notifications, jobs, user : req.user})
}
module.exports.getfreelancerbyId = async (req, res, next)=>
{
    const id = req.params.freelancerId

    const freelancer = await freelancerModel.findById(id)
    res.status(201).json({freelancer})
}

module.exports.updateProfile = async (req, res) => { 
    try {

        const updateData = {
            "fullname.firstname": req.body.firstname,
            "fullname.lastname": req.body.lastname,

            "profile.title": req.body.title,
            "profile.bio": req.body.bio,
            "profile.hourlyRate": req.body.hourlyRate,
            "profile.experienceLevel": req.body.experienceLevel,
            "profile.github": req.body.github,
            "profile.linkedin": req.body.linkedin,
        };

        // Skills
        if (req.body.skills) {
            updateData["profile.skills"] = JSON.parse(req.body.skills);
        }

        // Profile Picture
        if (req.file) {
            updateData["profile.profilePicture"] = req.file.filename;
        }

        const freelancer = await freelancerModel.findByIdAndUpdate(
            req.user._id,
            {
                $set: updateData
            },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        return res.status(200).json({
            message: "Profile updated successfully",
            freelancer
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }
};