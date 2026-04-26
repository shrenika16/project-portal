const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Pending" },
  assignedTo: String
});

module.exports = mongoose.model("Project", projectSchema);