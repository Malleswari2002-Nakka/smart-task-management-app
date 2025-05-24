import express from "express";
import cors from "cors";
import {getUsers} from "../controllers/user.js";
import {authenticateToken} from "../utils/authMiddleware.js";

const userRouter=express.Router();
userRouter.use(cors());
userRouter.get("/users",authenticateToken,getUsers);

export default userRouter;