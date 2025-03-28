const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://souste-blog-api.netlify.app"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Welcome to the Blog API");
});

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My Blog API App - listening on port ${PORT}`);
});
