import express from "express";
import { fetchCompletedTasks } from "../controllers/getCompletedTasks.js";
const completeRouter = express.Router();

completeRouter.get("/completed", fetchCompletedTasks);

export default completeRouter;