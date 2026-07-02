const express = require('express')
const router = express.Router()
const clientController = require('../controllers/client_controller')
const authentication = require('../middlewares/authentication')
const {body} = require('express-validator')
const clientModel = require('../models/client_model')
const {authClient} = require('../middlewares/authentication')
const {authFreelancer} = require('../middlewares/authentication')
const {uploadProfilePic}= require('../middlewares/multer')

router.post('/register',[
  body('fullname.firstname').isLength({min:3}).withMessage("Invalid Name"),
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Password must be Atleast 6 character"),
  body('contactno').matches(/^[0-9]{10}$/).withMessage("Invalid Contact Number"),
  body("gender").isIn(['Male','Female','Other']).withMessage("Invalid Gender")
], clientController.register)

router.post('/login',[
  body('email').isEmail().withMessage("Invalid Email"),
  body('password').isLength({min:6}).withMessage("Invalid Credentials")
], clientController.login)

router.get('/logout',authClient, clientController.logout)

router.get('/profile', authClient, clientController.getprofile)

router.get('/getclient/:clientId', authFreelancer, clientController.getClientbyId)

router.patch('/updateprofile', authClient, uploadProfilePic.single("profilePic"), clientController.updateProfile)

module.exports = router