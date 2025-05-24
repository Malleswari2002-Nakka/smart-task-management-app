import express from "express";
import cors from "cors";
import { deleteTaskController } from "../controllers/deleteTasks.js";

const deleteRouter=express.Router();

deleteRouter.use(cors());


deleteRouter.delete("/:id",deleteTaskController);

export default deleteRouter;