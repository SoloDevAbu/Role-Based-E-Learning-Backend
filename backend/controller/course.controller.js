const { Course, Admin } = require("../db");

const createCourse = async (req, res) => {
    const { title, description, thumbnailLink, videoLink, price } = req.body;
    const { username } = req.headers;

    try {
        const authore = await Admin.findOne({username})
        const course = await Course.create({
            title,
            description,
            thumbnailLink,
            videoLink,
            price,
            authore: authore._id
        })
        const admin = await Admin.findOneAndUpdate({ username },{
            $addToSet: {
                coursesCreated: course._id
            }
        })

        res.status(200).json({
            course: course.title,
            msg: "Course created successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({})
        res.status(200).json({
            courses
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateCourse = async (req, res) => {
    const { username } = req.headers;
    const { courseId } = req.params;

    const { title, description, thumbnailLink, videoLink, price } = req.body;

    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }

        if (course.authore.toString() !== admin._id.toString()) {
            return res.status(403).json({ msg: "You are not authorized to update this course" });
        }

        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            title,
            description,
            thumbnailLink,
            videoLink,
            price
        }, { new: true });

        res.status(200).json({
            course: updatedCourse.title,
            msg: "Course updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

//TODO: if any user has purchased the course, then we should not delete the course
const deleteCourse = async (req, res) => {
    const { username } = req.headers;
    const { courseId } = req.params;

    try {
        const admin = await Admin.findOneAndUpdate({ username }, {
            $pull: {
                coursesCreated: courseId
            }
        })
        const course = await Course.findOneByIdAndDelete(courseId)
        res.status(200).json({
            course: course.title,
            msg: "Course deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
}