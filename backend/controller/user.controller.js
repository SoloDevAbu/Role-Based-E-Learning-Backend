const { User, Course } = require("../db");

const createUser = async (req, res) => {
    const {username,email, password} = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        })
        res.status(200).json({
            username: user.username,
            msg: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getUser = async (req, res) => {
    const {username} = req.headers;

    try {
        const user = await User.findOne({
            username
        })

        res.status(200).json({
            username: user.username,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateUser = async (req, res) => {
    const {username, password} = req.body;
    const {email} = req.headers;
    try {
        const user = await User.findOneAndUpdate({
            email
        }, {
            username,
            password,
        })

        res.status(200).json({
            username: user.username,
            msg: "User updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

const purchaseCourse = async (req, res) => {
    const {courseId} = req.params;
    const {username} = req.headers;

    try {
        const user = await User.findOneAndUpdate({
            username
        }, {
            $addToSet: {
                purchedCourses: courseId
            }
        })
        res.status(200).json({
            msg: "Course purchased successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getPurchasedCourses = async (req, res) => {
    const {username} = req.headers;

    try {
        const user = await User.findOne({username});
        const courses = await Course.find({
            _id: {
                "$in": user.purchedCourses
            }
        })

        res.status(200).json({
            courses: courses
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports={
    createUser,
    getUser,
    updateUser,
    purchaseCourse,
    getPurchasedCourses
}