const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { jwtAuthMiddleware } = require("../middleware/auth");

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/profile", jwtAuthMiddleware, userController.getProfile);
router.put(
  "/profile/password",
  jwtAuthMiddleware,
  userController.updatePassword
);

module.exports = router;
