const express = require('express')
const { authUser } = require('../middlewares/authentication')
const messageController = require('../controllers/message_controller')
const router = express.Router()

router.post('/sendmessage/:convoId', authUser, messageController.postMessage)
router.get('/:convoId', authUser, messageController.getMessages)

module.exports = router