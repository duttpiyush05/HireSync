const express = require('express')
const router = express.Router()
const messageController = require('../controllers/conversation_controller')
const { authUser } = require('../middlewares/authentication')

router.get('/:contractId', authUser, messageController.getInfoForMessage)

router.get('/status/:receiverId', authUser, messageController.getStatus)


module.exports = router