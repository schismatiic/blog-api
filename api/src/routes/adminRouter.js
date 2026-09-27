import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  validateCreatePost,
  validateUpdatePost,
} from "../controllers/adminController.js";
import verifyToken from "../middleware/verifyToken.js";
import verifyAdmin from "../middleware/verifyAdmin.js";

const adminRouter = Router();

adminRouter.get("/posts", verifyToken, verifyAdmin, getPosts);
adminRouter.post(
  "/posts",
  verifyToken,
  verifyAdmin,
  validateCreatePost,
  createPost,
);
adminRouter.get("/posts/:postId", verifyToken, verifyAdmin, getPost);
adminRouter.put(
  "/posts/:postId",
  verifyToken,
  verifyAdmin,
  validateUpdatePost,
  updatePost,
);
adminRouter.delete("/posts/:postId", verifyToken, verifyAdmin, deletePost);

export default adminRouter;
