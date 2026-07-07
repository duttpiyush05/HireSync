const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const freelancerController = require('../controllers/fl_controller')
const authentication = require('../middlewares/authentication')
const freelancerModel = require('../models/fl_model')
const {authFreelancer} = require('../middlewares/authentication')
const {authClient} = require('../middlewares/authentication')
const {uploadProfilePic}= require('../middlewares/multer')


router.post('/register', [
  body('fullname.firstname').isLength({min :3}).withMessage("Firstname must be atleast of 3 character"),
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Password must be Atleast 6 character"),
  body('password').isLength({max:15}).withMessage("Password Atmost be of 6 character"),
  body('contactno').matches(/^[0-9]{10}$/).withMessage("Invalid Contact Number"),
  body('gender').isIn(['Male','Female','Other']).withMessage("Invalid Gender")
], freelancerController.register)

router.post('/auth/verify-otp', freelancerController.verifyOtp)

router.post('/auth/resend-otp', freelancerController.resendOtp)

router.post('/auth',authFreelancer, freelancerController.logout)

router.post('/login', [
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Invalid Credentials")
], freelancerController.login)

router.get('/logout',authFreelancer, freelancerController.logout)

router.get('/profile', authFreelancer, freelancerController.getprofile)

router.get('/getfreelancer/:freelancerId', authClient, freelancerController.getfreelancerbyId)

router.patch('/updateprofile', authFreelancer, uploadProfilePic.single("profilePic"), freelancerController.updateProfile)

module.exports = router