import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const TaskSorter = ({ onSort }) => {
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);

  const sortOptions = [
    { id: "newest", label: "Newest First", icon: ArrowDown },
    { id: "oldest", label: "Oldest First", icon: ArrowUp },
    { id: "priority-high", label: "Priority (High → Low)", icon: ArrowDown },
    { id: "priority-low", label: "Priority (Low → High)", icon: ArrowUp },
    { id: "due-soon", label: "Due Date (Soon)", icon: ArrowUp },
    { id: "due-late", label: "Due Date (Later)", icon: ArrowDown },
    { id: "title-az", label: "Title (A → Z)", icon: ArrowUp },
    { id: "title-za", label: "Title (Z → A)", icon: ArrowDown },
  ];

  const handleSort = (id) => {
    setSortBy(id);
    onSort(id);
    setSortOpen(false);
  };

  const currentSort = sortOptions.find((opt) => opt.id === sortBy);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative inline-block"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setSortOpen(!sortOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-neon text-white font-medium text-sm hover:opacity-90 transition"
      >
        <ArrowUpDown className="w-4 h-4" />
        {currentSort?.label}
      </motion.button>

      {sortOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="absolute top-full mt-2 right-0 bg-gradient-cyber border border-white/20 rounded-xl shadow-xl z-20 min-w-48 overflow-hidden"
        >
          {sortOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <motion.button
                key={opt.id}
                whileHover={{ backgroundColor: "rgba(0, 217, 255, 0.1)" }}
                onClick={() => handleSort(opt.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition ${
                  sortBy === opt.id
                    ? "bg-cyan-500/20 text-cyan-300 border-l-2 border-cyan-400"
                    : "text-zinc-300 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {opt.label}
                {sortBy === opt.id && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400" />}
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskSorter;
