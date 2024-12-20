const { Admin } = require("../db");

const createAdmin = async (req, res) => {
    const {username, email, password} = req.body;

    try {
        const admin = await Admin.create({
            username,
            email,
            password
        })
        res.status(200).json({
            username: admin.username,
            msg: "Admin created successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
    
}

const getAdmin = async (req, res) => {
    const {username} = req.headers;

    try {
        const admin = await Admin.findOne({
            username
        })

        res.status(200).json({
            username: admin.username
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateAdmin = async (req, res) => {
    const {username, password} = req.body;
    const {email} = req.headers
    try {
        const admin = await Admin.findOneAndUpdate({
            email
        }, {
            username,
            password
        })
        res.json({
            msg: "Admin Updated successfully",
            username: username
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    createAdmin,
    getAdmin,
    updateAdmin
};