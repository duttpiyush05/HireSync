const express = require('express')
const router = express.Router()
const contractController = require('../controllers/contract_controller')
const { authClient } = require('../middlewares/authentication')

router.get('/getAllContracts', authClient, contractController.getAllContracts)

router.get('/:contractId', contractController.getContractbyId)

module.exports = router