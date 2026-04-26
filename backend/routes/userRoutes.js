const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const User = require("../models/User");

// GET all users (Admin)
router.get("/", auth, role(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE user
router.delete("/:id", auth, role(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// UPDATE user (EDIT)
router.put("/:id", auth, role(["admin"]), async (req, res) => {
  try {
    const { name, email, role: userRole } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role: userRole },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;