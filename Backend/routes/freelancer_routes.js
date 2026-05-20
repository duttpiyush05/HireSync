const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const freelancerController = require('../controllers/fl_controller')
const authentication = require('../middlewares/authentication')
const freelancerModel = require('../models/fl_model')

router.post('/register', [
  body('fullname.firstname').isLength({min :3}).withMessage("Firstname must be atleast of 3 character"),
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Password must be Atleast 6 character"),
  body('contactno').matches(/^[0-9]{10}$/).withMessage("Invalid Contact Number"),
  body("gender").isIn(['Male','Female','Other']).withMessage("Invalid Gender")
], freelancerController.register)

router.post('/login', [
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Invalid Password")
], freelancerController.login)

router.get('/logout', authentication.authFreelancer, freelancerController.logout)

router.get('/profile', authentication.authFreelancer, freelancerController.getprofile)

module.exports = router