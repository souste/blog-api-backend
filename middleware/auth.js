const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // Make sure there is a space after Bearer here (I forgot)
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

module.exports = auth;
