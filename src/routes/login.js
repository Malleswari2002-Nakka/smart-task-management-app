import express from "express";
import cors from "cors";
import {login,newToken} from "../controllers/login.js";

const router=express.Router();
router.use(cors());
router.post("/login",login);
router.post("/refresh-token",newToken);

export default router;