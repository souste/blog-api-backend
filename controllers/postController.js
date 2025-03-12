const pool = require("../db/pool");

const getAllPosts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM posts");
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

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [postId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Post Not Found",
        message: `No post found with id ${postId}`,
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

module.exports = {
  getAllPosts,
  getPost,
};
