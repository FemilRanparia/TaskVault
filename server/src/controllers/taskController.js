const Task = require("../models/Task");

// GET user's tasks
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

// CREATE task
exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority, estimatedHours, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority: priority || "medium",
    estimatedHours: estimatedHours || 0,
    category: category || "general",
    user: req.user._id,
  });

  res.status(201).json(task);
};


// UPDATE task
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const { title, description, status, dueDate, priority, estimatedHours, category, completedAt } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (priority !== undefined) task.priority = priority;
  if (estimatedHours !== undefined) task.estimatedHours = estimatedHours;
  if (category !== undefined) task.category = category;
  if (completedAt !== undefined) task.completedAt = completedAt;

  const updatedTask = await task.save();
  res.json(updatedTask);
};


// DELETE task
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Ownership check
  if (task.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await task.deleteOne();
  res.json({ message: "Task removed" });
};
