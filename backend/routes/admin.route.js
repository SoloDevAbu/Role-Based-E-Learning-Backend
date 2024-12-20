const { Router } = require("express");
const router = Router();
const adminMiddleware = require("../middleware/admin");
const { createAdmin, getAdmin, updateAdmin } = require("../controller/admin.controller");

router.post('/signup', createAdmin);
router.get('/signin', adminMiddleware, getAdmin);
router.put('/update', adminMiddleware, updateAdmin);


module.exports = router;