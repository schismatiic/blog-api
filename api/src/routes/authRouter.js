import { Router } from "express";
import {
  createUser,
  loginUser,
  validateCreateUser,
  validateLogin,
} from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/register", validateCreateUser, createUser);
authRouter.post("/login", validateLogin, loginUser);

export default authRouter;
