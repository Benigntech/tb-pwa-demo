

const mongoose = require('mongoose');
const User = require('../User');

const CourseSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,

        name: String,

        description: String,

        price: {
            type: Number,
            required: true
        },

        creationDate: {
            type: Date,
            default: Date.now
        },

        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },

        deleted: {
            type: mongoose.Schema.Types.Boolean,
            default: false
        }
    }
);

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;