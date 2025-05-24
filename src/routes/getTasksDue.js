import express from "express";
import { getTasksDueTodayController } from "../controllers/getTasksDue.js";

const DueRouter = express.Router();

DueRouter.get("/dueToday", getTasksDueTodayController);

export default DueRouter;