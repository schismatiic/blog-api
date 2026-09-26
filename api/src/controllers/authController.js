import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../../db/queries.js";
import { body, validationResult, matchedData } from "express-validator";

// Validation
const lengthErr = "must be between 1 and 25 characters.";
const lengthErr2 = "must be at least 5 characters.";
const validateCreateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 25 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ max: 25 })
    .withMessage(`Last name ${lengthErr}`),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 25 })
    .custom(async (value) => {
      const user = await db.getUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    })
    .withMessage("Username already in use"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail()
    .custom(async (value) => {
      const user = await db.getEmail(value);
      if (user) {
        throw new Error("Email already in use");
      }
    })
    .withMessage("Email already in use"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 5 })
    .withMessage(`Password ${lengthErr2}`),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required.")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match."),
];
const validateLogin = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Username or email is required"),
  body("password").trim().notEmpty().withMessage("Password is required."),
];

// Create
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { firstName, lastName, username, email, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.createUser(
    firstName,
    lastName,
    username,
    email,
    hashedPassword,
  );
  return res.status(201).json({
    message: "User created successfully",
    username: user.username,
    email: user.email,
  });
};

// Login
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  // Find the user :D
  const { identifier, password } = matchedData(req);
  const user = await db.getIdentifier(identifier);
  // If the user doesn't exist...
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  const match = await bcrypt.compare(password, user.password);
  // If the password doesn't match...
  if (!match) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
  // JWT
  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return res.json({ token });
};
export { createUser, loginUser, validateCreateUser, validateLogin };
