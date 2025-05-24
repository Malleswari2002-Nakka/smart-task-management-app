import express from "express";
import cors from "cors";
import { deleteUserController } from "../controllers/deleteUsers.js";


const deleteUserRouter=express.Router();
deleteUserRouter.use(cors());
deleteUserRouter.delete("/:id",deleteUserController);

export default deleteUserRouter;
