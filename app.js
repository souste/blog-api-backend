const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Blog API");
});

const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const userRoutes = require("./routes/userRoutes");

app.use("/api/v1/posts", postRoutes);
// app.use("/api/v1/comments", commentRoutes);
// app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My Blog API App - listening on port ${PORT}`);
});
