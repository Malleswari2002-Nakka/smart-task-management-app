
import express from "express";
import signUpController from "../controllers/signup.js";

const signupRouter = express.Router();
signupRouter.post("/register", signUpController);

export default signupRouter;
