"use client"

import type { ReactNode } from "react"
import type { Task } from "@/types/task"
import { Notification } from "./Notification"
import { Clock, AlertTriangle } from "lucide-react"

// Decorator Pattern: Adds reminder functionality to tasks
interface TaskDecoratorProps {
  task: Task
  children: ReactNode
}

export function TaskDecorator({ task, children }: TaskDecoratorProps) {
  // Check if task has a due date
  const hasDueDate = !!task.dueDate

  // Check if task is overdue
  const isOverdue = hasDueDate && task.dueDate && new Date(task.dueDate) < new Date()

  return (
    <div className="relative">
      {children}

      {/* Reminder icon for tasks with due date */}
      {hasDueDate && !isOverdue && (
        <div className="absolute top-4 right-4">
          <p>You have a due date. Clock is ticking!</p>
          <Clock className="h-5 w-5 text-blue-500 justify-end" />
        </div>
      )}

      {/* Observer Pattern: Show notification for overdue tasks */}
      {isOverdue && (
        <Notification>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>This task is overdue!</span>
          </div>
        </Notification>
      )}
    </div>
  )
}
