const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { authFreelancer } = require('../middlewares/authentication');
const proposalController = require( '../controllers/proposal_controller')

router.post('/:jobId', authFreelancer, upload.single('portfolio'), proposalController.createProposal)

router.get('/:proposalId', authFreelancer, proposalController.getProposalInfo)

module.exports = router;
