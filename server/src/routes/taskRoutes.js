const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// All routes are protected
router.route("/")
  .get(protect, getTasks)
  .post(protect, createTask);

router.route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
