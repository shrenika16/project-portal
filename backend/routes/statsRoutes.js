const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const User = require("../models/User");

// GET STATS (ADMIN ONLY)
router.get("/", auth, role(["admin"]), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const admins = await User.countDocuments({ role: "admin" });
    const clients = await User.countDocuments({ role: "client" });
    const users = await User.countDocuments({ role: "user" });

    res.json({
      totalUsers,
      admins,
      clients,
      users
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;