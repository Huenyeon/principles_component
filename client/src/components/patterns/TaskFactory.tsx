// src/patterns/FactoryPattern.tsx
import React from "react";

interface TaskProps {
  type: "basic" | "timed" | "checklist";
}

const BasicTask = () => <div className="task">📝 Basic Task</div>;
const TimedTask = () => <div className="task">⏱️ Timed Task</div>;
const ChecklistTask = () => (
  <div className="task">
    ✅ Checklist Task
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </div>
);

export const TaskFactory: React.FC<TaskProps> = ({ type }) => {
  switch (type) {
    case "basic": return <BasicTask />;
    case "timed": return <TimedTask />;
    case "checklist": return <ChecklistTask />;
    default: return <div>❓ Unknown Task</div>;
  }
};