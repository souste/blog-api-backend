const pool = require("../db/pool");

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
    const result = await pool.query(
      `INSERT INTO users (first_name, last_name, username, email, password)
              VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [first_name, last_name, username, email, password]
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

module.exports = {
  createNewUser,
};
