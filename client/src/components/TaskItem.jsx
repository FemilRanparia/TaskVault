import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Clock, Zap, Tag } from "lucide-react";

const TaskItem = ({ task, onUpdate, onDelete, index }) => {
  const [busy, setBusy] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const statusStyle = {
    todo: { bg: "from-red-500/10 to-transparent border-red-500/30", badge: "bg-red-500/20 text-red-300" },
    "in-progress": { bg: "from-amber-500/10 to-transparent border-amber-500/30", badge: "bg-amber-500/20 text-amber-300" },
    completed: { bg: "from-lime-500/10 to-transparent border-lime-500/30", badge: "bg-lime-500/20 text-lime-300" },
  };

  const priorityStyle = {
    low: "text-cyan-400",
    medium: "text-amber-400",
    high: "text-pink-400",
  };

  const getDueStyle = (date) => {
    const diff = new Date(date) - new Date();
    const days = diff / (1000 * 60 * 60 * 24);

    if (days < 0) return "bg-red-500/20 text-red-300 border border-red-500/30";
    if (days < 2) return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
  };

  const getStatusLabel = (status) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 backdrop-blur-sm group
        ${statusStyle[task.status].bg} ${statusStyle[task.status].border} border`}
    >
      {/* Animated background on hover */}
      <motion.div
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent"
      />

      <div className="relative p-5 z-10">
        <div className="flex items-start justify-between gap-4">
          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-lg font-semibold text-white truncate">
                {task.title}
              </h3>
              {task.priority && (
                <span className={`flex-shrink-0 text-xs font-bold ${priorityStyle[task.priority]} uppercase`}>
                  {task.priority === 'high' && '🔴'}
                  {task.priority === 'medium' && '🟡'}
                  {task.priority === 'low' && '🟢'}
                </span>
              )}
            </div>

            {task.description && (
              <p className="text-sm text-zinc-300 mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Tags and Info */}
            <div className="flex flex-wrap gap-2 items-center">
              {task.category && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 text-xs text-zinc-300">
                  <Tag className="w-3 h-3" />
                  {task.category}
                </span>
              )}

              {task.estimatedHours > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 text-xs text-zinc-300">
                  <Zap className="w-3 h-3" />
                  {task.estimatedHours}h
                </span>
              )}

              {task.dueDate && (
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium ${getDueStyle(task.dueDate)}`}>
                  <Clock className="w-3 h-3" />
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Status Selector and Delete */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <select
              disabled={busy}
              value={task.status}
              onChange={async (e) => {
                setBusy(true);
                await onUpdate(task._id, { 
                  status: e.target.value,
                  completedAt: e.target.value === 'completed' ? new Date().toISOString() : null
                });
                setBusy(false);
              }}
              className={`text-xs font-semibold px-3 py-2 rounded-lg cursor-pointer transition ${statusStyle[task.status].badge} border border-current border-opacity-30 bg-black/40 backdrop-blur-sm`}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task._id)}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;

