const express = require('express');
const app = express();
const adminRouter = require("./routes/admin.route");
const userRouter = require("./routes/user.route");
const courseRouter = require("./routes/course.route");

app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use('/course', courseRouter);

const PORT = 3000;

app.listen(PORT);
