import { getTasksByCategories } from "../controllers/popularCategories.js";
import express from "express";

const categoryRouter=express.Router();
categoryRouter.get("/categories",getTasksByCategories);
export default categoryRouter;