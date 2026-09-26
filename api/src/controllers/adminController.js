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
  const { title, content, imageUrl } = matchedData(req);
  const post = await db.createPost(title, content, imageUrl, userId);
  return res.status(201).json(post);
};

export { createPost, validateCreatePost };
