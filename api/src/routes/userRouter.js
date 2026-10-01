import { Router } from "express";
import {
  updateUserAvatar,
  validateAvatar,
} from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const userRouter = Router();

userRouter.patch("/profile", verifyToken, validateAvatar, updateUserAvatar);

export default userRouter;
