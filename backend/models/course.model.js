const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnailLink: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
        unique: true,
    },
    price: { 
        type: Number,
        required: true,
    },
    authore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
}, {
    timestamps: true,
});

module.exports = CourseSchema;