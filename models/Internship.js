const mongoose = require('mongoose');

const intershipSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: {
            type: [String],
            required: true
        },
        location: {
            type: String,
            required: true
        },
        workMode: {
            type: String,
            required: true,
            enum: ['on-site', 'hybrid', 'remote']
        },
        employmentType: {
            type: String,
            required: true,
            enum: ['part-time', 'full-time']
        },
        duration: {
            type: String,
            required: true
        },
        stipend: {
            type: Number,
            min: 0,
            validate: {
                validator: Number.isInteger,
                message: 'Stipend must be a whole number'
            }
        },
        vacancies: {
            type: Number,
            required: true,
            min: 1,
            validate: {
                validator: Number.isInteger,
                message: 'Vacancies must be a whole number'
            }
        },
        applicationDeadline: {
            type: Date,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

    },
    { timestamps: true }

)

const Internship = mongoose.model('Internship', intershipSchema);
module.exports = Internship;