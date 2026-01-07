import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";

const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1).getDay();
    // Days in month
    const lastDay = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= lastDay; i++) {
      days.push(new Date(year, month, i));
    }
    setDaysInMonth(days);
  }, [currentDate]);

  const getTasksForDate = (date) => {
    if (!date) return [];
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-gradient-cyber p-6 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">{monthName}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <ChevronLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-xs text-white"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 rounded-lg hover:bg-white/10 transition"
          >
            <ChevronRight className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-zinc-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date, idx) => {
          const tasksForDay = date ? getTasksForDate(date) : [];
          const isToday =
            date &&
            date.getDate() === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear();

          return (
            <motion.div
              key={idx}
              whileHover={date ? { scale: 1.05 } : {}}
              className={`aspect-square p-2 rounded-lg border transition ${
                !date
                  ? "bg-transparent border-transparent"
                  : isToday
                  ? "bg-cyan-500/30 border-cyan-400 shadow-glow"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {date && (
                <div className="flex flex-col h-full">
                  <span className={`text-xs font-semibold ${isToday ? "text-cyan-300" : "text-white"}`}>
                    {date.getDate()}
                  </span>
                  <div className="flex-1 flex flex-col gap-0.5 justify-center">
                    {tasksForDay.slice(0, 3).map((task) => (
                      <div
                        key={task._id}
                        className={`h-1 rounded-full ${
                          task.status === "completed"
                            ? "bg-lime-500"
                            : task.priority === "high"
                            ? "bg-pink-500"
                            : task.priority === "medium"
                            ? "bg-amber-500"
                            : "bg-cyan-500"
                        }`}
                      />
                    ))}
                    {tasksForDay.length > 3 && (
                      <span className="text-xs text-zinc-500">+{tasksForDay.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500" />
          <span>Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-500" />
          <span>High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-lime-500" />
          <span>Completed</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CalendarView;
