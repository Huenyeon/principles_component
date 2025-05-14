// src/patterns/StrategyPattern.ts
import { Task as SingletonTask } from "./SingletonPattern";

export const TaskSortingStrategy = {
  sortByDate: (tasks: Task[]) => [...tasks].sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || "")),
  sortByName: (tasks: Task[]) => [...tasks].sort((a, b) => a.title.localeCompare(b.title)),
  sortById: (tasks: Task[]) => [...tasks].sort((a, b) => a.id.localeCompare(b.id))
};

// src/patterns/ObserverPattern.tsx

interface Task {
  id: string;
  title: string;
  dueDate?: string;
}

const now = new Date();
const tasks: Task[] = [
  { id: "1", title: "Past Task", dueDate: "2023-01-01" },
  { id: "2", title: "Future Task", dueDate: "2025-12-31" }
];

export const Notification = ({ message }: { message: string }) => (
  <div className="text-red-500 font-bold">{message}</div>
);

export const ObserverDemo = () => (
  <div>
    <h2 className="text-xl font-semibold">🔔 Observer Pattern</h2>
    {tasks.map(task => {
      const isOverdue = task.dueDate && new Date(task.dueDate) < now;
      return (
        <div key={task.id}>
          {task.title}
          {isOverdue && <Notification message="Your task is overdue" />}
        </div>
      );
    })}
  </div>
);
