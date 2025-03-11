const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => res.send("Hello there!"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My Blog API App - listening on port ${PORT}`);
});
