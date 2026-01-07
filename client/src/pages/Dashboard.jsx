import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import TaskTimeline from "../components/TaskTimeline";
import StatsCards from "../components/StatsCards";
import TaskCharts from "../components/TaskCharts";
import TaskHistory from "../components/TaskHistory";
import SearchFilter from "../components/SearchFilter";
import TaskSorter from "../components/TaskSorter";
import CalendarView from "../components/CalendarView";
import KanbanBoard from "../components/KanbanBoard";
import UserSettings from "../components/UserSettings";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { motion } from "framer-motion";
import { LayoutGrid, List, BarChart3, Calendar, Trello, Settings } from "lucide-react";

// Helper: group tasks by due date
const groupTasksByDate = (tasks) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return {
    overdue: tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) < today
    ),
    today: tasks.filter((t) => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    }),
    upcoming: tasks.filter(
      (t) => t.dueDate && new Date(t.dueDate) > today
    ),
  };
};

const Dashboard = () => {
  const { user, logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
  });

  // Fetch tasks once
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
        setFilteredTasks(res.data);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Comprehensive filter and sort function
  const applyFiltersAndSort = (tasksToFilter, query, filters, sort) => {
    let result = tasksToFilter;

    // Apply search filter
    if (query) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply status/priority/category filters with proper null/undefined handling
    result = result.filter((task) => {
      // Handle status filter
      const taskStatus = task.status || "todo";
      const matchStatus = filters.status === "all" || taskStatus === filters.status;

      // Handle priority filter
      const taskPriority = task.priority || "medium";
      const matchPriority = filters.priority === "all" || taskPriority === filters.priority;

      // Handle category filter
      const taskCategory = task.category || "general";
      const matchCategory = filters.category === "all" || taskCategory === filters.category;

      return matchStatus && matchPriority && matchCategory;
    });

    // Apply sorting
    const sorted = [...result];
    switch (sort) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "priority-high":
        return sorted.sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1);
        });
      case "priority-low":
        return sorted.sort((a, b) => {
          const priorityOrder = { low: 0, medium: 1, high: 2 };
          return (priorityOrder[a.priority] || 1) - (priorityOrder[b.priority] || 1);
        });
      case "due-soon":
        return sorted.sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        });
      case "due-late":
        return sorted.sort((a, b) => {
          if (!a.dueDate) return -1;
          if (!b.dueDate) return 1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        });
      case "title-az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "title-za":
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = applyFiltersAndSort(tasks, query, activeFilters, sortBy);
    setFilteredTasks(filtered);
  };

  // Filter functionality
  const handleFilter = (filters) => {
    setActiveFilters(filters);
    const filtered = applyFiltersAndSort(tasks, searchQuery, filters, sortBy);
    setFilteredTasks(filtered);
  };

  // Sort functionality
  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    const filtered = applyFiltersAndSort(tasks, searchQuery, activeFilters, sortOption);
    setFilteredTasks(filtered);
  };

  const handleAdd = async (data) => {
    const res = await createTask(data);
    setTasks((prev) => [res.data, ...prev]);
    setFilteredTasks((prev) => [res.data, ...prev]);
  };

  const handleUpdate = async (id, data) => {
    const res = await updateTask(id, data);
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? res.data : t))
    );
    setFilteredTasks((prev) =>
      prev.map((t) => (t._id === id ? res.data : t))
    );
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
    setFilteredTasks((prev) => prev.filter((t) => t._id !== id));
  };

  // ✅ grouped MUST be inside component
  const grouped = groupTasksByDate(filteredTasks);

  const viewOptions = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "list", label: "Tasks", icon: List },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "kanban", label: "Kanban", icon: Trello },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Navbar */}
      <Navbar user={user} onLogout={logout} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header with View Selector */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {user?.name}
              </h1>
              <p className="text-zinc-400">
                Keep track of your tasks and boost your productivity
              </p>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex gap-2 flex-wrap mb-6">
            {viewOptions.map((option) => {
              const Icon = option.icon;
              return (
                <motion.button
                  key={option.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setView(option.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all border ${
                    view === option.id
                      ? "bg-gradient-neon text-white border-cyan-400 shadow-glow"
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-white/20"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                </motion.button>
              );
            })}
          </div>

          {/* Search & Filter (only in list/tasks view) */}
          {view === "list" && (
            <div className="flex gap-4 mb-6 items-end">
              <div className="flex-1">
                <SearchFilter
                  onSearch={handleSearch}
                  onFilter={handleFilter}
                  tasks={tasks}
                />
              </div>
              <TaskSorter onSort={handleSort} />
            </div>
          )}
        </motion.div>

        {/* Content Area */}
        {loading ? (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-center py-20"
          >
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-pink-400 animate-spin" />
              <p className="text-zinc-400">Loading your tasks...</p>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Task Form - only in Dashboard view */}
            {view === "dashboard" && (
              <TaskForm onAdd={handleAdd} />
            )}

            {/* Dashboard View */}
            {view === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {tasks.length > 0 ? (
                  <div className="space-y-4">
                    {tasks.map((task, idx) => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        index={idx}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 rounded-2xl border border-white/10 bg-white/5 mt-8"
                  >
                    <p className="text-xl text-zinc-400">No tasks yet</p>
                    <p className="text-sm text-zinc-500 mt-2">Create your first task to get started!</p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Tasks List View */}
            {view === "list" && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Task Groups */}
                <div className="space-y-8 mt-8">
                  {/* Overdue */}
                  {grouped.overdue.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-red-500 rounded-full" />
                        Overdue ({grouped.overdue.length})
                      </h2>
                      <div className="space-y-3">
                        {grouped.overdue.map((task, idx) => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            index={idx}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Today */}
                  {grouped.today.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <h2 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-amber-500 rounded-full" />
                        Today ({grouped.today.length})
                      </h2>
                      <div className="space-y-3">
                        {grouped.today.map((task, idx) => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            index={idx}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Upcoming */}
                  {grouped.upcoming.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-cyan-500 rounded-full" />
                        Upcoming ({grouped.upcoming.length})
                      </h2>
                      <div className="space-y-3">
                        {grouped.upcoming.map((task, idx) => (
                          <TaskItem
                            key={task._id}
                            task={task}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            index={idx}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* No organized tasks */}
                  {grouped.overdue.length === 0 && grouped.today.length === 0 && grouped.upcoming.length === 0 && (
                    <div className="space-y-3">
                      {tasks.map((task, idx) => (
                        <TaskItem
                          key={task._id}
                          task={task}
                          onUpdate={handleUpdate}
                          onDelete={handleDelete}
                          index={idx}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Analytics View */}
            {view === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <StatsCards tasks={filteredTasks} />
                <TaskCharts tasks={filteredTasks} />
                <TaskHistory tasks={filteredTasks} />
              </motion.div>
            )}

            {/* Calendar View */}
            {view === "calendar" && (
              <motion.div
                key="calendar"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CalendarView tasks={filteredTasks} />
              </motion.div>
            )}

            {/* Kanban Board View */}
            {view === "kanban" && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <KanbanBoard
                  tasks={filteredTasks}
                  onStatusChange={handleUpdate}
                  onDelete={handleDelete}
                />
              </motion.div>
            )}

            {/* Settings View */}
            {view === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UserSettings user={user} onLogout={logout} />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
