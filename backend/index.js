const express = require('express');
const app = express();
const adminRouter = require("../backend/routes/admin.route");
const userRouter = require("../backend/routes/user.route");
const courseRouter = require("../backend/routes/course.route");

app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use('/course', courseRouter);

const PORT = 3000;

app.listen(PORT);
