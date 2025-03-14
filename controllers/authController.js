const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret-key";

const alphaErr = "must only contain letters";
const lengthErr = "must be between 8 and 20 characters";

const validateUser = [
  body("first_name").trim().isAlpha().withMessage(`First name ${alphaErr}`),
  body("last_name").trim().isAlpha().withMessage(`Last Name ${alphaErr}`),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").trim().isEmail().withMessage("Invalid Email Format").normalizeEmail(),
  body("password").trim().isLength({ min: 8, max: 20 }).withMessage(`Password ${lengthErr}`),
  body("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
];

const validateLogin = [
  body("email").trim().isEmail().withMessage("Invalid Email Format").normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { first_name, last_name, username, email } = req.body;

    const userExists = await pool.query("SELECT * FROM users WHERE email = $1 OR username = $2", [email, username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "User with that email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, password)
              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, username, email, hashedPassword]
    );

    const payload = {
      user: {
        id: result.rows[0].id,
        username: result.rows[0].username,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({
      success: true,
      data: { user: result.rows[0], token },
      message: "User Created Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

module.exports = {
  validateUser,
  createNewUser,
  //   loginUser,
};
