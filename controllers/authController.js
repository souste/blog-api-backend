const pool = require("../db/pool");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createNewUser = async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    if (!first_name || !last_name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "All fields are required",
      });
    }

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
//   const user = "jeevy";
//   const token = await jwt.sign({ user }, "secretkey", { expiresIn: "1h" });
//   res.json({
//     token,
//   });
// };

module.exports = {
  createNewUser,
  loginUser,
};
