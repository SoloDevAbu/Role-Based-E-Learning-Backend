const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username,
        password
    })
    res.json({
        msg: "User created successfully"
    })
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find({})
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implementation course purchase logic
    const courseId = req.params.courseId
    const username = req.headers.username


    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchesCourse: courseId
        }
    })

    res.json({
        msg: "Purches complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    })

    const courses = await Course.find({
        _id: {
            "$in": user.purchesCourse
        }
    })
    res.json({
        courses
    })
});

module.exports = router