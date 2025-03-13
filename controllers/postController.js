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
    const postId = parseInt(req.params.id);
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

const createNewPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;
    // Will need to change user_id from a form input when working on the front end

    if (!title || !content || !user_id) {
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        message: "Title, Content and User ID are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO posts (title, content, user_id)
        VALUES ($1, $2, $3) RETURNING *`,
      [title, content, user_id]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "Post Created Successfully",
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

const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;

    const checkPost = await pool.query("SELECT * FROM posts WHERE id = $1", [postId]);

    if (checkPost.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Post Not Found",
        message: `No post found with id ${postId}`,
      });
    }

    const result = await pool.query(
      `UPDATE posts
            SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
      [title, content, postId]
    );

    res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "Post Updated Successfully",
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

const deletePost = async (req, res) => {
  // I assume I need to delete comments associated with posts here too?
  try {
    const postId = parseInt(req.params.id);

    const checkPost = await pool.query("SELECT * FROM posts WHERE id = $1", [postId]);

    if (checkPost.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Post Not Found",
        message: `No post found with id ${postId}`,
      });
    }

    await pool.query("DELETE FROM posts WHERE id = $1", [postId]);

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
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
  createNewPost,
  updatePost,
  deletePost,
};
