const pool = require("../db/pool");

const getAllCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const result = await pool.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
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

const getCommentByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.id;

    const postCheck = await pool.query("SELECT id FROM posts WHERE id = $1", [postId]);

    if (postCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Post Not Found",
        message: `No post found with ID ${postId}`,
      });
    }

    const result = await pool.query("SELECT * FROM comments WHERE post_Id = $1 AND id = $2", [postId, commentId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Comment Not Found",
        message: `No comment found with id ${commentId}`,
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

const createNewCommentByPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content, user_id } = req.body;
    // Will need to change user_id from a form input when working on the front end

    if (!content || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "Content (and User ID) required",
      });
    }

    const result = await pool.query(
      `INSERT INTO comments (content, user_id, post_id) 
            VALUES ($1, $2, $3) RETURNING *`,
      [content, user_id, postId]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Comment Created Successfully",
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
  getAllCommentsByPost,
  getCommentByPost,
  createNewCommentByPost,
};
