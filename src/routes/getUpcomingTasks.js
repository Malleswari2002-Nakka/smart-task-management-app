import express from "express";
import { getUpcomingTask } from "../controllers/getUpcomingTasks.js";

const upcomingRouter=express.Router();
upcomingRouter.get("/upcoming",getUpcomingTask);
export default upcomingRouter;