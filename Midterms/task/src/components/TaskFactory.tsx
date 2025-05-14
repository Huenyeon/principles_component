"use client"

import type { Task } from "@/types/task"
import { BasicTask } from "./tasks/BasicTask"
import { TimedTask } from "./tasks/TimedTask"
import { ChecklistTask } from "./tasks/ChecklistTask"
import { TaskDecorator } from "./TaskDecorator"

// Factory Pattern: Creates different task components based on type
interface TaskFactoryProps {
  task: Task
}

export function TaskFactory({ task }: TaskFactoryProps) {
  // Determine which task component to render based on type
  const renderTask = () => {
    switch (task.type) {
      case "basic":
        return <BasicTask task={task} />
      case "timed":
        return <TimedTask task={task} />
      case "checklist":
        return <ChecklistTask task={task} />
      default:
        return <BasicTask task={task} />
    }
  }

  // Wrap the task with the decorator if it has a due date
  return <TaskDecorator task={task}>{renderTask()}</TaskDecorator>
}
