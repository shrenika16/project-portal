const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");
const projectRoutes = require("./routes/projectRoutes");

// middleware
const auth = require("./middleware/authMiddleware");
const role = require("./middleware/roleMiddleware");

// models
const User = require("./models/User");

// middleware setup
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/projects", projectRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// admin route
app.get("/api/admin", auth, role(["admin"]), (req, res) => {
  res.json({ msg: "Welcome Admin" });
});

// fallback user fetch (ONLY IF NOT USING userRoutes)
app.get("/api/all-users", auth, role(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});