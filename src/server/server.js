// index.js
import express from 'express';
import taskRouter from '../routes/tasks.js';
import signupRouter from '../routes/signup.js';
import tasksRouter from '../routes/getTasks.js';
import auditRouter from '../routes/Admin.js';
import deleteRouter from '../routes/deleteTasks.js';
import deleteUserRouter from '../routes/deleteUsers.js';
import statusRouter from '../routes/updateStatus.js';
import taskstatusRouter from '../routes/getTaskStatus.js';
import Admin from '../models/admin.js';
import  User from '../models/user.js';
import userRouter from "../routes/user.js";
import categoryRouter from '../routes/popularCategories.js';
import DueRouter from '../routes/getTasksDue.js';
import Task from '../models/tasks.js';
import completeRouter from '../routes/getCompletedTasks.js';
import cors from "cors";
import createAdminAccount from "../scripts/admin.js";
import router from "../routes/login.js";
import updateRouter from '../routes/updateTasks.js';
import upcomingRouter from '../routes/getUpcomingTasks.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware

app.use(cors());
app.use(express.json());


app.use("/user", signupRouter);
app.use("/auth",router);
app.use("/api",userRouter);
app.use("/task",taskRouter);
app.use("/tasks",tasksRouter);
app.use("/updatetasks",updateRouter);
app.use("/deletetasks",deleteRouter);
app.use("/updatestatus",statusRouter);
app.use("/tasks", taskstatusRouter);
app.use("/tasks",DueRouter);
app.use("/tasks",upcomingRouter);
app.use("/tasks",completeRouter);
app.use("/tasks",categoryRouter);
app.use("/users",deleteUserRouter);
app.use("/admin",auditRouter);

User();
createAdminAccount();
Task();
// Admin();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
