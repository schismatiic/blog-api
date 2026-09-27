import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  getComments,
  updatePost,
  updatePostPublished,
  deletePost,
  deleteComment,
  validateCreatePost,
  validateUpdatePost,
  validateUpdatePostPublished,
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
adminRouter.patch(
  "/posts/:postId",
  verifyToken,
  verifyAdmin,
  validateUpdatePostPublished,
  updatePostPublished,
);
adminRouter.delete("/posts/:postId", verifyToken, verifyAdmin, deletePost);
adminRouter.get("/comments", verifyToken, verifyAdmin, getComments);
adminRouter.delete(
  "/comments/:commentId",
  verifyToken,
  verifyAdmin,
  deleteComment,
);

export default adminRouter;
