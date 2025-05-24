import express from "express";
import cors from "cors";
import { updateTaskStatus } from "../controllers/updateStatus.js";

const statusRouter = express.Router();

statusRouter.use(cors());

statusRouter.put("/:id", updateTaskStatus);

export default statusRouter;