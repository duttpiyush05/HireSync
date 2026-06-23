const express = require('express')
const router = express.Router()
const contractController = require('../controllers/contract_controller')
const { authClient, authFreelancer } = require('../middlewares/authentication')
const { authUser } = require('../middlewares/authentication')

router.get('/getAllContracts', authUser, contractController.getAllContracts)

router.get('/:contractId', authUser, contractController.getContractbyId)

router.patch('/completionRequest/:contractId', authFreelancer, contractController.completionRequest)

router.patch('/markCompleted/:contractId', authClient, contractController.markCompleted)

router.patch('/markCancel/:contractId', authClient, contractController.markCancel)

module.exports = router