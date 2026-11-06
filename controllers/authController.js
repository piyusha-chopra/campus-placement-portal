const User = require('../models/User');
const generateToken = require('../utils/generateToken');

//controller for user signup/registration 
const signup = async (req, res) => {

    try {

        //extracting user info from req.body
        const data = req.body;

        //check if user already exists or not
        const isUser = await User.findOne({
            $or: [
                { username: data.username },
                { email: data.email }
            ]
        });

        if (isUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        //create new User document using mongoose model with extracted user info
        const newUser = new User(data);

        //save new User to db
        const response = await newUser.save();

        //create a separate object containing only the fields sent to the user       
        const safeUser = {
            id: response.id,
            username: response.username,
            name: response.name,
            email: response.email,
            phone: response.phone,
            role: response.role
        }

        const payload = {
            id: response.id,
            role: response.role
        };

        const token = generateToken(payload);

        console.log('User signup successful');

        res.status(201).json({
            message: 'Signup Successful',
            user: safeUser,
            token: token
        });

    } catch (err) {

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }

}

//controller for user login
const login = async (req, res) => {

    try {

        //extract username and password from req.body for login
        const { username, password } = req.body;

        const user= await User.findOne({username:username});

        if(!user || !(await user.comparePassword(password))){

            return res.status(401).json({message:'Invalid username or password'});

        }

        const safeUser={
            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }

        const payload={
            id:user.id,
            role:user.role
        }

        const token= generateToken(payload);

        console.log('User login successful');

        res.status(200).json({message:'Login Successful', user:safeUser, token:token});

    } catch (err) {

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }


}


const updatePassword= async (req,res)=>{
    try{

        const userId=req.user.id;

        const {currentPassword, newPassword}=req.body;

        if(!currentPassword || !newPassword){
            return res.status(400).json({message:'Both current and new passwords are required'});
        }

        const user= await User.findById(userId);

        if(!user) {
            return res.status(404).json({message:'User not found'});
        }

        if(!(await user.comparePassword(currentPassword))){
            return res.status(401).json({message:'Invalid Password'});
        }

        user.password=newPassword;
        await user.save();

        res.status(200).json({message:'Password updated succesfully'});

    }catch(err){

        console.log(err);
        res.status(500).json({ err: 'Internal server error' });

    }
}


module.exports = { signup , login, updatePassword};