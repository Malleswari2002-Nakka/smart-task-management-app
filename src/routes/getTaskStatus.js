import express from "express";
import { getTaskStatus } from "../controllers/getTaskStatus.js";

const taskstatusRouter = express.Router();

taskstatusRouter.get("/status", getTaskStatus);

export default taskstatusRouter;