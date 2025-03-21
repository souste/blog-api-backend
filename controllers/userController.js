const pool = require("../db/pool");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json({
      success: true,
      data: result.rows,
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

const getUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User not found",
        message: `No user found with id ${userId}`,
      });
    }
    res.status(200).json({
      success: true,
      data: result.rows[0],
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

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { first_name, last_name, username, email, password } = req.body;

    const checkUser = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
        message: `No user found with id ${userId}`,
      });
    }

    const result = await pool.query(
      `UPDATE users
            SET first_name = $1, last_name = $2, username = $3, email = $4, password = $5 WHERE id = $6 RETURNING *`,
      [first_name, last_name, username, email, password, userId]
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User Updated Successfully",
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

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const checkUser = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);

    if (checkUser.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
        message: `No user found with id ${userId}`,
      });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
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
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
