const express = require('express')
const router = express.Router()
const {authUser} = require('../middlewares/authentication')
const reviewController = require('../controllers/review_controller')

router.get('/:contractId', authUser, reviewController.leaveReviews)

router.post('/:contractId', authUser, reviewController.postReview)

module.exports = router