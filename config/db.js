const dns=require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose=require('mongoose');
require('dotenv').config();

//define mongo URL
const mongoURL= process.env.MONGO_URL_LOCAL;

//set up mongoDB connection
mongoose.connect(mongoURL);

//set up the default connection
const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to MongoDB server');
})

db.on('error',(err)=>{
    console.log('MongoDB connection error',err);
})

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

module.exports=db;