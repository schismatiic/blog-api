import db from "../../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

// Validation
const validateCreatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title must be 150 characters or less"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("imageUrl")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Enter a valid image URL"),
  body("isPublished").isBoolean().withMessage("isPublished must be a boolean"),
];
const validateUpdatePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title must be 150 characters or less"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("imageUrl")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Enter a valid image URL"),
  body("isPublished").isBoolean().withMessage("isPublished must be a boolean"),
];
const validateUpdatePostPublished = [
  body("isPublished").isBoolean().withMessage("isPublished must be a boolean"),
];
// Create
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { userId } = req.user;
  const { title, content, imageUrl, isPublished } = matchedData(req);
  const post = await db.createPost(
    title,
    content,
    imageUrl,
    isPublished,
    userId,
  );
  return res.status(201).json(post);
};
// Read
const getPosts = async (req, res) => {
  const posts = await db.getAdminPosts();
  return res.json(posts);
};
const getPost = async (req, res) => {
  const { postId } = req.params;
  const post = await db.getAdminPostById(Number(postId));
  if (!post) {
    return res.sendStatus(404);
  }
  return res.json(post);
};
const getComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await db.getAdminComments(Number(postId));
  return res.json(comments);
};
// Update
const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { postId } = req.params;
  const { title, content, imageUrl, isPublished } = matchedData(req);
  const post = await db.updatePost(
    Number(postId),
    title,
    content,
    imageUrl,
    isPublished,
  );
  return res.json(post);
};
const updatePostPublished = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { postId } = req.params;
  const { isPublished } = matchedData(req);
  const post = await db.updatePostPublished(Number(postId), isPublished);
  return res.json(post);
};
// Delete
const deletePost = async (req, res) => {
  const { postId } = req.params;
  await db.deletePost(Number(postId));
  return res.sendStatus(204);
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  await db.deleteComment(Number(commentId));
  return res.sendStatus(204);
};

export {
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
};
