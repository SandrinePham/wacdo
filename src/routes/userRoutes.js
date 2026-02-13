const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { allowRoles } = require("../middlewares/roleMiddleware");
const User = require("../models/user");

// Public
router.post("/register", register);
router.post("/login", login);

// Admin only
router.get("/", verifyToken, allowRoles("ADMIN"), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
