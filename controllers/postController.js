const pool = require("../db/pool");

const getAllPosts = (req, res) => {
  res.status(200).json({ message: "Hello from the server side", app: "Blog API" });
};

module.exports = {
  getAllPosts,
};
