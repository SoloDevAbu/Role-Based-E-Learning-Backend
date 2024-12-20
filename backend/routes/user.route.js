const { Router } = require("express");
const { createUser, getUser, updateUser, getPurchasedCourses, purchaseCourse } = require("../controller/user.controller");
const userMiddleware = require("../middleware/user");
const router = Router();

router.post('/signup', createUser);
router.get('/signin', userMiddleware, getUser);
router.put('/update', userMiddleware, updateUser);
router.put('/purches/:courseId', userMiddleware, purchaseCourse);
router.get('/getcourses', userMiddleware, getPurchasedCourses);

module.exports = router