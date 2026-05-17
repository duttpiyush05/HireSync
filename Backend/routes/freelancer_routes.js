const express = require('express')
const {body} = require('express-validator')
const {verify} = require('bcrypt')
// const flModel = require('../models/fl_model')
const freelancerController = require('../controllers/fl_controller')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', [
  body('fullname.firstname').isLength({min :3}).withMessage("Firstname must be atleast of 3 character"),
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Password must be Atleast 6 character"),
  body('contactno').matches("/^[0-9]{10}$/").withMessage("Invalid Contact Number"),
  body("gender").isIn('male','female','other').withMessage("Invalid Gender")
], freelancerController.register)

router.post('/login', [
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Invalid Password")
], freelancerController.login)

router.get('/logout', authentication.authFreelancer, freelancerController.logout)

router.get('/profile', authentication.authFreelancer, freelancerController.getprofile)

module.exports = router