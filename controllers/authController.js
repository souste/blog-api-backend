const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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

const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const { first_name, last_name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, password)
              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, username, email, hashedPassword]
    );
    res.status(201).json({
      success: true,
      data: result.rows[0],
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

// const loginUser = async (req, res) => {
// need to apply bcrypt compare here
//   const user = "jeevy";
//   const token = await jwt.sign({ user }, "secretkey", { expiresIn: "1h" });
//   res.json({
//     token,
//   });
// };

module.exports = {
  validateUser,
  createNewUser,
  //   loginUser,
};
