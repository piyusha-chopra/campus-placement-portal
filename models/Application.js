const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        internship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Internship',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'shortlisted', 'accepted', 'rejected'],
            default: 'pending',
        },
        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
)

//compound unique index
applicationSchema.index(
    { student: 1, internship: 1 },
    { unique: true }
)

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;