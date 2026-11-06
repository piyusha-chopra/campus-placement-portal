const express= require('express');
const router= express.Router();
const jwtAuthMiddleware=require('../middleware/jwtAuthMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');
const { applyInternship, getInternshipApplications, updateApplicationStatus} = require('../controllers/applicationController');


//POST route to create application
router.post('/:internshipId/apply', jwtAuthMiddleware, roleMiddleware('student'),applyInternship );

//GET route to view applications for recruiter
router.get('/:internshipId', jwtAuthMiddleware, roleMiddleware('recruiter'), getInternshipApplications);

//POST route to update application status by recruiter
router.post('/:applicationId/status', jwtAuthMiddleware, roleMiddleware('recruiter'), updateApplicationStatus);

module.exports=router;