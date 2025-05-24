import express from "express";
import cors from "cors";
import { getTasks } from "../controllers/getTasks.js";

const tasksRouter=express.Router();
tasksRouter.use(cors());
tasksRouter.get("/gettasks",getTasks);

export default tasksRouter;