const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { authFreelancer, authClient } = require('../middlewares/authentication');
const proposalController = require( '../controllers/proposal_controller')

router.post('/:jobId', authFreelancer, upload.single('portfolio'), proposalController.createProposal)

router.get('/:proposalId', authFreelancer, proposalController.getProposalInfo)

router.get('/clients/:clientId', authClient, proposalController.getProposalsforClient)

router.patch('/proposals/:proposalId/status', authClient, proposalController.updateProposalStatus)

module.exports = router;
