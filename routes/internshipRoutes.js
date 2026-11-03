const express= require('express');
const router= express.Router();
const jwtAuthMiddleware=require('../middleware/jwtAuthMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

const {createInternship,updateInternship,deleteInternship}= require('../controllers/internshipController');

//POST route to create internship
router.post('/',jwtAuthMiddleware,roleMiddleware('recruiter'),createInternship);

//PUT route to update internship
router.put('/:id',jwtAuthMiddleware,roleMiddleware('recruiter'),updateInternship);

//DELETE route to delete internship
router.delete('/:id',jwtAuthMiddleware,roleMiddleware('recruiter'),deleteInternship);

module.exports=router;