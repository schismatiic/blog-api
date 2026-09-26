import { body, validationResult, matchedData } from "express-validator";
import db from "../../db/queries.js";

// Validation
const validateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ max: 1500 })
    .withMessage("Comment must be 1500 characters or less"),
];
// Create
const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { userId } = req.user;
  const { postId } = req.params;
  const { content } = matchedData(req);
  const comment = await db.createComment(content, userId, Number(postId));
  return res.status(201).json({
    message: "Comment created successfully",
    content: comment.content,
  });
};
// Read
const getComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await db.getComments(Number(postId));
  return res.json(comments);
};

export { createComment, getComments, validateComment };
