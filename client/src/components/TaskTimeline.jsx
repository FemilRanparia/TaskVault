import TaskItem from "./TaskItem";

const Section = ({ title, tasks }) => (
  <div className="space-y-3">
    <h2 className="text-xs uppercase tracking-widest text-zinc-500">
      {title}
    </h2>

    {tasks.length === 0 && (
      <p className="text-sm text-zinc-500">No tasks</p>
    )}

    {tasks.map((task) => (
      <TaskItem
        key={task._id}
        task={task}
      />
    ))}
  </div>
);

const TaskTimeline = ({ tasks }) => {
  return (
    <div className="space-y-10">
      <Section title="Overdue" tasks={tasks.overdue} />
      <Section title="Today" tasks={tasks.today} />
      <Section title="Upcoming" tasks={tasks.upcoming} />
    </div>
  );
};

export default TaskTimeline;
