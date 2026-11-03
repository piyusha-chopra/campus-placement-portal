const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();
const db=require('./config/db');


//importing route files
const userRoutes=require('./routes/userRoutes');
const internshipRoutes=require('./routes/internshipRoutes');

//using route files
app.use('/user',userRoutes);
app.use('/internship',internshipRoutes);



const PORT=process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
    console.log(`Server is listening on PORT ${PORT}`);
})