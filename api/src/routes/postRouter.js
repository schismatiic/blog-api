import { Router } from "express";
import { getPosts, getPost } from "../controllers/postController.js";
const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.get("/:postId", getPost);

export default postRouter;
