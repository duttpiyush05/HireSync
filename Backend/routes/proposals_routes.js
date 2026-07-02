const express = require('express');
const router = express.Router();
const {uploadProposal} = require('../middlewares/multer');
const { authFreelancer, authClient } = require('../middlewares/authentication');
const proposalController = require( '../controllers/proposal_controller')

router.post('/:jobId', authFreelancer, uploadProposal.single('portfolio'), proposalController.createProposal)

router.get('/getFreelancerProposal', authFreelancer, proposalController.getFreelancerProposal)

router.get('/:proposalId', authFreelancer, proposalController.getProposalInfo)

router.get('/clients/:clientId', authClient, proposalController.getProposalsforClient)

router.patch('/proposals/:proposalId/status', authClient, proposalController.updateProposalStatus)

router.get('/getFreelancerProposal', authFreelancer, proposalController.getFreelancerProposal)

module.exports = router;
