const express =  require('express')
const { authFreelancer } = require('../middlewares/authentication')
const router = express.Router()
const notificationController = require('../controllers/notification_controller')
const { authUser } = require('../middlewares/authentication')

router.get('/', authUser, notificationController.getNotifications)
router.patch('/markAllasRead', authUser, notificationController.markAllasRead)
router.get('/getunreadcount', authUser, notificationController.getunreadcount)

module.exports = router