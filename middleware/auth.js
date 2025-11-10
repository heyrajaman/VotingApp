const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Invalid token" });
  }
};

const checkAdminRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "User does not have admin role" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { jwtAuthMiddleware, checkAdminRole };
