const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['student', 'recruiter']
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);


//generating hash password
userSchema.pre('save', async function () {

    const user = this;
    //hash the password only is password is modified(or added)
    if (!user.isModified('password')) return;

    //generate salt
    const salt = await bcrypt.genSalt(10);

    //generate hash password
    const hashedPassword = await bcrypt.hash(user.password, salt);

    //replace original password with hashed password
    user.password = hashedPassword;

})



const User = mongoose.model('User', userSchema);
module.exports = User;