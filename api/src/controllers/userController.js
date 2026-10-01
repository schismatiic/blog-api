import db from "../../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

// Validation
const validateAvatar = [
  body("avatarUrl")
    .trim()
    .notEmpty()
    .withMessage("Avatar URL is required")
    .isURL()
    .withMessage("Avatar URL must be a valid URL"),
];

// Update
const updateUserAvatar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { userId } = req.user;
  const { avatarUrl } = matchedData(req);
  const user = await db.updateUserAvatar(userId, avatarUrl);
  return res.json(user);
};

export { updateUserAvatar, validateAvatar };
