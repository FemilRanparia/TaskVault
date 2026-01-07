import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const TaskCharts = ({ tasks }) => {
  // Status distribution
  const statusData = [
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'in-progress').length },
    { name: 'Pending', value: tasks.filter(t => t.status === 'todo').length },
  ];

  // Priority distribution
  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'high').length },
    { name: 'Medium', value: tasks.filter(t => t.priority === 'medium').length },
    { name: 'Low', value: tasks.filter(t => t.priority === 'low').length },
  ];

  // Daily completion data (last 7 days)
  const getLast7DaysData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      const completedCount = tasks.filter(t => {
        if (!t.completedAt) return false;
        const completedDate = new Date(t.completedAt);
        return completedDate.toDateString() === date.toDateString();
      }).length;
      
      data.push({ date: dateStr, completed: completedCount });
    }
    return data;
  };

  const lineChartData = getLast7DaysData();

  const COLORS = {
    status: ['#00ff00', '#fbbf24', '#ef4444'],
    priority: ['#ff006e', '#b366ff', '#00d9ff'],
    line: '#00d9ff',
  };

  const ChartContainer = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-cyber rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all backdrop-blur-xl"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-neon rounded-full" />
        {title}
      </h3>
      {children}
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Status Distribution Pie Chart */}
      <ChartContainer title="Task Status Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS.status[index]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 14, 39, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
              }}
              formatter={(value) => [`${value} tasks`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Priority Distribution */}
      <ChartContainer title="Priority Breakdown">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priorityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 14, 39, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" fill="#b366ff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Completion Trend */}
      <ChartContainer title="Completion Trend (Last 7 Days)">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 14, 39, 0.9)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke={COLORS.line}
              strokeWidth={3}
              dot={{ fill: COLORS.line, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Productivity Score */}
      <ChartContainer title="Productivity Score">
        <div className="flex flex-col items-center justify-center h-full py-8">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={`${(tasks.filter(t => t.status === 'completed').length / tasks.length || 0) * 283} 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d9ff" />
                  <stop offset="100%" stopColor="#00ff00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan-400">
                  {Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length || 0) * 100)}%
                </p>
                <p className="text-xs text-zinc-400">Complete</p>
              </div>
            </div>
          </div>
        </div>
      </ChartContainer>
    </div>
  );
};

export default TaskCharts;
