const express=require('express');
const router=express.Router();

const {signup, login, updatePassword}=require('../controllers/authController');
const jwtAuthMiddleware = require('../middleware/jwtAuthMiddleware');

//POST route for user signup
router.post('/signup',signup);

//POST route for user login
router.post('/login',login);

//POST route to update password
router.post('/updatePassword',jwtAuthMiddleware, updatePassword)

module.exports=router;