import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";

const SearchFilter = ({ onSearch, onFilter, tasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all",
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const categories = ["general", "work", "personal", "shopping", "health"];
  const priorities = ["low", "medium", "high"];
  const statuses = ["todo", "in-progress", "completed"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 space-y-3"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-cyan-400" />
        <input
          type="text"
          placeholder="Search tasks by title or description..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-zinc-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
        />
      </div>

      {/* Filter Toggle */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white text-sm"
      >
        <Filter className="w-4 h-4" />
        Filters
        {Object.values(filters).some((v) => v !== "all") && (
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
        )}
      </motion.button>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
        >
          {/* Status Filter */}
          <div>
            <label className="text-xs font-semibold text-cyan-400 block mb-2">
              STATUS
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-sm focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Status</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="text-xs font-semibold text-cyan-400 block mb-2">
              PRIORITY
            </label>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-sm focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Priorities</option>
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-cyan-400 block mb-2">
              CATEGORY
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/20 text-white text-sm focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchFilter;
