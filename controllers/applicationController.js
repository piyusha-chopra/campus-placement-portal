const Application = require('../models/Application');
const Internship = require('../models/Internship');
const User = require('../models/User');


const applyInternship = async (req, res)=>{

    try {

        const userId = req.user.id; //extract user id from req user
        const internshipId = req.params.internshipId; //extract internship id from req parameters

        //check if already applied 
        const alreadyApplied = await Application.findOne({ student: userId, internship: internshipId });
        if(alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this internship' });
        }
        //check if user exists
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //check if internship exists and is active
        const internship = await Internship.findOne({
            _id: internshipId,
            isActive: true
        });
        if(!internship) {
            return res.status(404).json({ message: 'Internship not found or is not active' });
        }

        //check if deadline has passed or not
        const currentDate = new Date();
        if(internship.applicationDeadline < currentDate) {
            return res.status(400).json({ message: 'The application deadline for this internship has passed' });
        }
        //create application
        const newApplication = new Application({
            student: userId,
            internship: internshipId
        })

        const application = await newApplication.save();

        console.log('Application submitted successfully');

        res.status(201).json({ 
            message: 'Application submitted successfully', 
            application:{
                id:application._id,
                student:application.student,
                internship:application.internship,
                status:application.status,
                appliedAt:application.appliedAt
            } 
        });

    } catch (err) {

        if(err.code === 11000) {
            return res.status(409).json({
                message: 'You have already applied for this internship'
            });
        }

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }

}

//controller for viewing all applications for a particular internships by recruiter
const getInternshipApplications = async (req,res)=>{
    try{

        const recruiterId=req.user.id;
        const internshipId=req.params.internshipId;
        const internship=await Internship.findOne({
            _id:internshipId,
            postedBy:recruiterId
        }); //Verify that the internship exists and belongs to the logged-in recruiter
        
        if(!internship){
            return res.status(404).json({message:'Internship does not exists'});
        }

        //fetch all the applications for this particular internship
        const applications=await Application.find({internship:internshipId}).populate('student', 'username name email'); //Populate student reference to display selected student details

        res.status(200).json({applications:applications});

    }catch(err){

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }

}

const updateApplicationStatus= async(req,res)=>{
    try{

        const applicationId=req.params.applicationId; //extract application id from req parameters

        //check if this application exists
        const application= await Application.findById(applicationId);
        if(!application){

            return res.status(404).json({message:'Application does not exists'});
        }

        //check if internship belonged to logged in recruiter
        const recruiterId=req.user.id;
        const internship=await Internship.findOne({
            _id:application.internship,
            postedBy:recruiterId
        });

        if (!internship) {
            return res.status(403).json({
                message: 'You are not authorized to update this application'
            });
        }

        const {status}=req.body; //extract application status from req body

        //check valid application status
        const allowedStatus=['pending', 'shortlisted', 'accepted', 'rejected'];
        if(!allowedStatus.includes(status)){
             return res.status(400).json({message: 'Invalid application status'});
        }

        application.status=status; //update application status
        await application.save();

        console.log('Application status updated successfully');

        res.status(200).json({
            message:'Application status updated', 
            application:{
                id:application._id,
                student:application.student,
                internship:application.internship,
                status:application.status,
                appliedAt:application.appliedAt
            }
        });

    }catch(err){

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }
}

//controller for viewing all applications of internships by students
const getMyApplications= async(req,res)=>{
    
    try{

        const studentId=req.user.id;

        const applications= await Application.find({student:studentId}).select('-createdAt -updatedAt -__v').populate('internship','title company location workMode stipend');

        res.status(200).json({applications:applications});

    }catch(err){

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }
}


module.exports = {applyInternship, getInternshipApplications, updateApplicationStatus, getMyApplications};