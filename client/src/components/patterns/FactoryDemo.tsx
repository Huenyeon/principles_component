// src/patterns/FactoryDemo.tsx
import React from "react";
import { TaskFactory } from "./TaskFactory";

export const FactoryDemo = () => (
  <div>
    <h2 className="text-xl font-semibold">🏭 Factory Pattern</h2>
    <TaskFactory type="basic" />
    <TaskFactory type="timed" />
    <TaskFactory type="checklist" />
  </div>
);