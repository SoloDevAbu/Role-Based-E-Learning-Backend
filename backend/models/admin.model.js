const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    coursesCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
},{
    timestamps: true,
});

module.exports = AdminSchema;