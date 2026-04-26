const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// dummy projects (replace with DB later)
let projects = [];

router.get("/", auth, (req, res) => {
  res.json(projects);
});

router.post("/", auth, role(["admin"]), (req, res) => {
  const project = req.body;
  projects.push(project);
  res.json(project);
});

router.put("/:id", auth, role(["admin", "client"]), (req, res) => {
  projects[req.params.id] = req.body;
  res.json(req.body);
});

router.delete("/:id", auth, role(["admin"]), (req, res) => {
  projects.splice(req.params.id, 1);
  res.json({ msg: "Deleted" });
});

module.exports = router;