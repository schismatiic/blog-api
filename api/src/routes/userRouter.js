import { Router } from "express";
import {
  getUserProfile,
  updateUserAvatar,
  validateAvatar,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.get("/profile", verifyToken, getUserProfile);
userRouter.patch("/profile", verifyToken, validateAvatar, updateUserAvatar);

export default userRouter;
