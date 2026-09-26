import { Router } from "express";
import {
  createComment,
  getComments,
  validateComment,
} from "../controllers/commentController.js";
import verifyToken from "../middleware/verifyToken.js";
const commentRouter = Router({ mergeParams: true });

commentRouter.get("/", getComments);
commentRouter.post("/", verifyToken, validateComment, createComment);

export default commentRouter;
