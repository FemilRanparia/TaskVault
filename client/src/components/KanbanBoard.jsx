import { useState } from "react";
import { motion, Reorder } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

const KanbanBoard = ({ tasks, onStatusChange, onDelete }) => {
  const statuses = ["todo", "in-progress", "completed"];
  const statusColors = {
    todo: { bg: "bg-red-500/20", border: "border-red-500/30", label: "📋 To Do" },
    "in-progress": { bg: "bg-amber-500/20", border: "border-amber-500/30", label: "⚙️ In Progress" },
    completed: { bg: "bg-lime-500/20", border: "border-lime-500/30", label: "✅ Completed" },
  };

  const priorityEmoji = {
    high: "🔴",
    medium: "🟡",
    low: "🟢",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6"
    >
      {statuses.map((status) => {
        const statusTasks = tasks.filter((t) => t.status === status);
        const colors = statusColors[status];

        return (
          <motion.div
            key={status}
            className={`rounded-2xl border ${colors.border} ${colors.bg} p-4 min-h-96 backdrop-blur-xl`}
          >
            {/* Column Header */}
            <div className="mb-4 pb-4 border-b border-white/10">
              <h3 className="font-bold text-white flex items-center justify-between">
                <span>
                  {colors.label}
                  <span className="ml-2 text-sm text-zinc-400">({statusTasks.length})</span>
                </span>
              </h3>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {statusTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-zinc-500">No tasks yet</p>
                </div>
              ) : (
                statusTasks.map((task) => (
                  <motion.div
                    key={task._id}
                    layoutId={task._id}
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition group cursor-grab active:cursor-grabbing"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-sm">{priorityEmoji[task.priority]}</span>
                          <h4 className="text-sm font-semibold text-white truncate">
                            {task.title}
                          </h4>
                        </div>
                        {task.description && (
                          <p className="text-xs text-zinc-400 line-clamp-2 mb-2">
                            {task.description}
                          </p>
                        )}
                        <div className="flex gap-1 flex-wrap">
                          {task.category && (
                            <span className="text-xs px-2 py-1 rounded-md bg-cyan-500/20 text-cyan-300">
                              {task.category}
                            </span>
                          )}
                          {task.dueDate && (
                            <span className="text-xs px-2 py-1 rounded-md bg-amber-500/20 text-amber-300">
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => onDelete(task._id)}
                        className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:text-red-300 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status Transitions */}
                    {status !== "completed" && (
                      <div className="mt-2 flex gap-1">
                        {status === "todo" && (
                          <button
                            onClick={() => onStatusChange(task._id, "in-progress")}
                            className="text-xs px-2 py-1 rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition"
                          >
                            Start
                          </button>
                        )}
                        {status === "in-progress" && (
                          <button
                            onClick={() => onStatusChange(task._id, "completed")}
                            className="text-xs px-2 py-1 rounded-md bg-lime-500/20 text-lime-300 hover:bg-lime-500/30 transition"
                          >
                            Complete
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default KanbanBoard;
