const mongoose = require('mongoose');
const AdminSchema = require('../models/admin.model');
const UserSchema = require('../models/user.model');
const CourseSchema = require('../models/course.model');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:N1QSZgA78glwJnKc@cluster0.gblax.mongodb.net/E-Learning');

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}