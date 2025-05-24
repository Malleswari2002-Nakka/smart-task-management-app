import express from "express";
import taskController from "../controllers/tasks.js";

const taskRouter=express.Router();
taskRouter.post("/addtask",taskController);

export default taskRouter;