const express= require('express');
const router= express.Router();
const jwtAuthMiddleware=require('../middleware/jwtAuthMiddleware');
const roleMiddleware=require('../middleware/roleMiddleware');

const {createInternship,updateInternship,deleteInternship,viewInternship, viewInternshipById}= require('../controllers/internshipController');

//POST route to create internship
router.post('/',jwtAuthMiddleware,roleMiddleware('recruiter'),createInternship);

//PUT route to update internship
router.put('/:id',jwtAuthMiddleware,roleMiddleware('recruiter'),updateInternship);

//DELETE route to delete internship
router.delete('/:id',jwtAuthMiddleware,roleMiddleware('recruiter'),deleteInternship);

//GET route to view list of internships
router.get('/internships',viewInternship);

//GET route to view a particular internship using its ID
router.get('/internships/:id',viewInternshipById);

module.exports=router;