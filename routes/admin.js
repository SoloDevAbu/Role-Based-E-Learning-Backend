const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password
    })
    res.json({
        msg: "Admin created successfully"
    })
});

router.post('/courses', adminMiddleware, async(req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        msg: "COurse creates successfully" , courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    //fetching all courses logic
    const allCourses = await Course.find({})
    res.json({
        courses: allCourses
    })
});

module.exports = router;