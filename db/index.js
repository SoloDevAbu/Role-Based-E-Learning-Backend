const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:0ighEra5PvSAGn5n@cluster0.gblax.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchesCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}