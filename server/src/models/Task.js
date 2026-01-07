const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed"],
      default: "todo"
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    dueDate: {
      type: Date,
    },
    completedAt: {
      type: Date,
    },
    estimatedHours: {
      type: Number,
      default: 0
    },
    category: {
      type: String,
      default: "general"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);

