const express=require('express');
const app=express();
app.use(express.json());
require('dotenv').config();
const db=require('./config/db');


const PORT=process.env.PORT || 3000;
app.listen(PORT,(req,res)=>{
    console.log(`Server is listening on PORT ${PORT}`);
})