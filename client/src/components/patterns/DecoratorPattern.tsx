// src/patterns/DecoratorPattern.tsx
import React from "react";

interface Task {
  id: string;
  title: string;
  dueDate?: string;
}

const tasks: Task[] = [
  { id: "1", title: "With Reminder", dueDate: "2025-05-10" },
  { id: "2", title: "No Reminder" }
];

export const DecoratorDemo = () => (
  <div>
    <h2 className="text-xl font-semibold">🎀 Decorator Pattern</h2>
    {tasks.map(task => (
      <div key={task.id} className="relative border p-2 mb-2">
        {task.title}
        {task.dueDate && (
          <span className="absolute top-1 right-2 text-red-500">🔔</span>
        )}
      </div>
    ))}
  </div>
);