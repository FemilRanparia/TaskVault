import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const TaskHistory = ({ tasks }) => {
  // Sort tasks by creation date, show only recent ones
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const recentTasks = sortedTasks.slice(0, 10);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-lime-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'from-lime-500/10 to-transparent border-lime-500/30';
      case 'in-progress':
        return 'from-amber-500/10 to-transparent border-amber-500/30';
      default:
        return 'from-red-500/10 to-transparent border-red-500/30';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const taskDate = new Date(date);
    const diffTime = Math.abs(now - taskDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return taskDate.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-cyber rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all backdrop-blur-xl"
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-neon rounded-full" />
        Task History
      </h3>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentTasks.length === 0 ? (
          <p className="text-zinc-500 text-center py-8">No tasks yet. Create your first task!</p>
        ) : (
          recentTasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-gradient-to-r ${getStatusColor(task.status)} rounded-lg p-4 border backdrop-blur-sm hover:scale-102 transition-transform`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getStatusIcon(task.status)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{task.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    {formatDate(task.createdAt)} • 
                    <span className="ml-1 inline-block px-2 py-1 rounded bg-white/10 text-xs">
                      {task.status.replace('-', ' ')}
                    </span>
                  </p>
                  {task.description && (
                    <p className="text-sm text-zinc-300 mt-2 line-clamp-2">{task.description}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {recentTasks.length > 0 && (
        <button className="w-full mt-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 border-t border-white/10 pt-4 transition hover:bg-white/5 rounded-lg">
          View All History →
        </button>
      )}
    </motion.div>
  );
};

export default TaskHistory;
