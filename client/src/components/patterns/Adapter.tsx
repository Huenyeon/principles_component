// src/patterns/AdapterPattern.tsx
import React, { useEffect, useState } from "react";

interface ExternalTaskData {
  task_id: string;
  name: string;
  deadline?: string;
}

interface Task {
  id: string;
  title: string;
  dueDate?: string;
}

export const AdapterDemo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchAndAdaptTasks = async () => {
      const raw: ExternalTaskData[] = [
        { task_id: "1", name: "Adapt Me", deadline: "2025-05-08" },
        { task_id: "2", name: "Raw Task" }
      ];
      const adapted: Task[] = raw.map(item => ({
        id: item.task_id,
        title: item.name,
        dueDate: item.deadline
      }));
      setTasks(adapted);
    };
    fetchAndAdaptTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">🔌 Adapter Pattern</h2>
      {tasks.map(task => (
        <div key={task.id}>{task.title} {task.dueDate && `(Due: ${task.dueDate})`}</div>
      ))}
    </div>
  );
};