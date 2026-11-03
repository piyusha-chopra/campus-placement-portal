const Internship = require('../models/Internship');

const createInternship = async (req, res) => {

    try {

        //extracting internship info from req.body
        const data = req.body;

        //create new Internship document using mongoose model with extracted internship info
        const newInternship = new Internship({
            ...data,
            postedBy: req.user.id
        });

        const response = await newInternship.save();

        console.log('Internship added sucessfully');

        res.status(201).json({ message: 'Internship added sucessfully', internship: response });

    } catch (err) {

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
    }
}

const updateInternship = async (req, res) => {
    try {

        const id = req.params.id ; //extract id from URL parameters
        const {title,company,description,requirements,location,workMode,employmentType,duration,stipend,vacancies,applicationDeadline,isActive} = req.body; //extract new data from req body

        const allowedUpdatedFields={title,company,description,requirements,location,workMode,employmentType,duration,stipend,vacancies,applicationDeadline,isActive};

        //Update the internship only if it belongs to the authenticated recruiter
        const response = await Internship.findOneAndUpdate(
            {
                _id:id,
                postedBy:req.user.id
            },
            allowedUpdatedFields,
            {
                new: true,
                runValidators: true
            }
        );

        if(!response) return res.status(404).json({err: 'Internship not found'});

        console.log('Internship updated successfully');
        res.status(200).json({message: 'Internship updated successfully', response});

    } catch (err) {

        console.log(err);
        res.status(500).json({err: 'Internal server error'});

    }
}

const deleteInternship = async (req,res)=>{
    try{

        const id=req.params.id; //extract id from URL parameters

        //Delete the internship only if it belongs to the authenticated recruiter
        const response=await Internship.findOneAndDelete({
            _id:id,
            postedBy:req.user.id
        });

         if(!response) return res.status(404).json({err: 'Internship not found'});

        console.log('Internship deleted successfully');
        res.status(200).json({message:'Internship deleted successfully'});

    }catch(err){

        console.log(err);
        res.status(500).json({err: 'Internal server error'});

    }
}


module.exports = { createInternship, updateInternship, deleteInternship };