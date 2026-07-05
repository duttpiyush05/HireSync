const express = require('express')
const router = express.Router()
const {body} = require('express-validator')
const authentication = require('../middlewares/authentication')
const jobModel = require('../models/job_model')
const jobController = require('../controllers/job_controller')
const {authUser} = require('../middlewares/authentication')

router.post('/create',[
  body('title').isLength({min:5}).withMessage("Enter a valid Title"),
  body('category').isIn(['Web Development', 'Mobile Development','UI/UX Design','Graphic Design','Content Writing','Digital Marketing','AI/ML','Web Development','DevOps','Cybersecurity']).withMessage('Please Select Job Category'),
  body('description').isLength({min:10}).withMessage("Enter a clear job description"),
  body('skills').isArray({min:1}).withMessage("Atleast 1 skills be there"),
  body('budget.type').isIn(['fixed', 'hourly']).withMessage(""),
  body('budget.minbudget').notEmpty().withMessage("Enter a minimum budget"),
  body('budget.maxbudget').notEmpty().withMessage("Enter a maximum budget"),
  body('budget.duration').isIn(['1-3 Months','3-6 Months','8-12 Months','1 Year+']).withMessage(""),
  body('budget.xplevel').isIn(['Entry','Intermediate','Expert']).withMessage("")
],authentication.authClient, jobController.createJob)

router.get('/my-jobs', authentication.authClient, jobController.getMyJobs)

router.get('/all-jobs', authentication.authFreelancer, jobController.getAllJobs)

router.patch('/updateJob/:jobId', authentication.authClient, jobController.updateJob)

router.patch('/closeJob/:jobId', authentication.authClient, jobController.closeJob)

router.get('/jobInfo/:jobId', authUser, jobController.getJobInfo)

router.get('/:jobId', authentication.authFreelancer, jobController.getJobById)

module.exports = router