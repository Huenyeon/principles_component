// src/Miterm.tsx
import { TaskFactory } from "./components/patterns/TaskFactory";
import { TaskManagerSingleton } from "./components/patterns/SingletonPattern";
import { AdapterDemo } from "./components/patterns/Adapter";
import { DecoratorDemo } from "./components/patterns/DecoratorPattern";
import { TaskSortingStrategy } from "./components/patterns/StrategyPattern";
import { ObserverDemo } from "./components/patterns/StrategyPattern";

export const Midterm = () => {
  const tasks = TaskManagerSingleton.getAllTasks();
  const sorted = TaskSortingStrategy.sortByDate(tasks);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">📝 To-Do List with Design Patterns</h1>

      <div>
        <h2 className="text-xl font-semibold">🏭 Factory Pattern</h2>
        <TaskFactory type="basic" />
        <TaskFactory type="timed" />
        <TaskFactory type="checklist" />
      </div>

      <div>
        <h2 className="text-xl font-semibold">🔁 Singleton + 🧠 Strategy</h2>
        {sorted.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>

      <AdapterDemo />
      <DecoratorDemo />
      <ObserverDemo />
    </div>
  );
};
