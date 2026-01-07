import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Zap } from "lucide-react";

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [category, setCategory] = useState("general");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      description,
      dueDate,
      priority,
      estimatedHours: estimatedHours ? parseInt(estimatedHours) : 0,
      category,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
    setEstimatedHours("");
    setCategory("general");
    setIsExpanded(false);
  };

  const priorityColors = {
    low: "border-cyan-500/50 focus:ring-cyan-500",
    medium: "border-amber-500/50 focus:ring-amber-500",
    high: "border-pink-500/50 focus:ring-pink-500",
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-white/10 bg-gradient-cyber p-6 backdrop-blur-xl hover:border-cyan-500/30 transition-all"
    >
      <div className="flex flex-col gap-4">
        {/* Main Input Row */}
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="text-xs font-semibold text-cyan-400 mb-2 block">
              TASK TITLE
            </label>
            <input
              className="w-full rounded-xl bg-black/40 border border-white/20 px-5 py-4 text-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <motion.button
            type="submit"
            className="px-6 py-4 rounded-xl bg-gradient-neon hover:opacity-90 transition font-semibold flex items-center gap-2 text-white shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add</span>
          </motion.button>

          <motion.button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-4 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{isExpanded ? "−" : "+"}</span>
          </motion.button>
        </div>

        {/* Expanded Options */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="space-y-4 pt-4 border-t border-white/10">
            {/* Description */}
            <div>
              <label className="text-xs font-semibold text-cyan-400 mb-2 block">
                DESCRIPTION
              </label>
              <textarea
                className="w-full rounded-xl bg-black/40 border border-white/20 px-5 py-3 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm resize-none"
                placeholder="Add details about your task..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
              />
            </div>

            {/* Grid: Priority, Category, Hours, Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Priority */}
              <div>
                <label className="text-xs font-semibold text-cyan-400 mb-2 block">
                  PRIORITY
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`w-full rounded-xl bg-black/40 border ${priorityColors[priority]} px-4 py-3 text-sm text-white focus:ring-2 focus:border-transparent transition backdrop-blur-sm`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-cyan-400 mb-2 block">
                  CATEGORY
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                >
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="shopping">Shopping</option>
                  <option value="health">Health</option>
                </select>
              </div>

              {/* Estimated Hours */}
              <div>
                <label className="text-xs font-semibold text-cyan-400 mb-2 block flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  EST. HOURS
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                  placeholder="Hours"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="text-xs font-semibold text-cyan-400 mb-2 block flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  DUE DATE
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded-xl bg-black/40 border border-white/20 px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.form>
  );
};

export default TaskForm;

