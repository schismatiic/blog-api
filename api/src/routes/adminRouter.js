import { Router } from "express";
import {
  createPost,
  validateCreatePost,
} from "../controllers/adminController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const adminRouter = Router();

adminRouter.post(
  "/posts",
  verifyToken,
  verifyAdmin,
  validateCreatePost,
  createPost,
);

export default adminRouter;
