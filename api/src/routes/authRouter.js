import { Router } from "express";
import {
  createUser,
  validateCreateUser,
} from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/register", validateCreateUser, createUser);

export default authRouter;
