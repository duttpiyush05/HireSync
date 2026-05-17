const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client_controller')
const authentication = require('../middlewares/authentication')
const {body} = require('express-validator')
const clientModel = require('../models/client_model')

router.post('/register',[
  body('fullname.firstname').isLength({min:3}).withMessage("Invalid Name"),
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Password must be Atleast 6 character"),
  body('contactno').matches("/^[0-9]{10}$/").withMessage("Invalid Contact Number"),
  body("gender").isIn('male','female','other').withMessage("Invalid Gender")
], clientController.register)

router.post('/login',[
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Invalid Password")
], clientController.login)

router.get('/logout',authentication.authClient, clientController.logout)

router.get('/profile', authentication.authClient, clientController.getprofile)

module.exports = router

