import express from "express";
import cors from "cors";
import { updateTask } from "../controllers/updateTasks.js";

const updateRouter = express.Router();

updateRouter.use(cors());

updateRouter.put("/:id", updateTask);

export default updateRouter;