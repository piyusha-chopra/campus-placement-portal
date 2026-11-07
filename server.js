const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();
const db=require('./config/db');


//importing route files
const userRoutes=require('./routes/userRoutes');
const internshipRoutes=require('./routes/internshipRoutes');
const applicationRoutes= require('./routes/applicationRoutes');

//using route files
app.use('/api/user',userRoutes);
app.use('/api/internship',internshipRoutes);
app.use('/api/applications',applicationRoutes);



const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})