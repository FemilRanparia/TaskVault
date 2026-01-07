import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, Zap } from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-6 backdrop-blur-xl border border-white/10 hover:border-${color}/50 transition-all duration-300 group`}
      style={{
        background: `linear-gradient(135deg, rgba(10, 14, 39, 0.8) 0%, rgba(26, 31, 58, 0.6) 100%)`,
        boxShadow: `0 0 20px rgba(0, 217, 255, 0.1)`,
      }}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-${color}-500 to-transparent transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-${color}-500/20`}>
            <Icon className={`w-6 h-6 text-${color}-400`} />
          </div>
          {trend && (
            <span className={`text-xs font-semibold ${trend > 0 ? 'text-lime-400' : 'text-red-400'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
};

const StatsCards = ({ tasks }) => {
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = tasks.filter(t => t.status === 'todo').length;
  const total = tasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatsCard
        icon={CheckCircle2}
        label="Completed"
        value={completed}
        trend={completionRate}
        color="lime"
      />
      <StatsCard
        icon={Clock}
        label="In Progress"
        value={inProgress}
        color="amber"
      />
      <StatsCard
        icon={AlertCircle}
        label="Pending"
        value={pending}
        color="red"
      />
      <StatsCard
        icon={Zap}
        label="Completion Rate"
        value={`${completionRate}%`}
        color="cyan"
      />
    </div>
  );
};

export default StatsCards;
