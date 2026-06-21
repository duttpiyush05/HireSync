const express =  require('express')
const { authFreelancer } = require('../middlewares/authentication')
const router = express.Router()
const notificationController = require('../controllers/notification_controller')

router.get('/', authFreelancer, notificationController.getNotifications)

module.exports = router