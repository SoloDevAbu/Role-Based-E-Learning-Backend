const {Router} = require("express");
const { getCourses, createCourse, updateCourse, deleteCourse } = require("../controller/course.controller");
const adminMiddleware = require("../middleware/admin");
const router = Router();

router.get('/get', getCourses);
router.post("/create",adminMiddleware, createCourse);
router.put('/update/:courseId',adminMiddleware, updateCourse);
router.delete("/delete/:courseId",adminMiddleware, deleteCourse);

module.exports = router;