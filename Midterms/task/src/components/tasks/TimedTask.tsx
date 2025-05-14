"use client"

import { useState, useEffect } from "react"
import type { Task } from "@/types/task"
import { TaskManager } from "@/lib/TaskManager"
import { useTaskStore } from "@/store/taskStore"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Edit, Save, X, Timer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface TimedTaskProps {
  task: Task
}

export function TimedTask({ task }: TimedTaskProps) {
  const { updateTask, removeTask } = useTaskStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const [editedDescription, setEditedDescription] = useState(task.description || "")
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [progressPercent, setProgressPercent] = useState(100)

  // Calculate time remaining and progress
  useEffect(() => {
    if (!task.dueDate) return

    const updateTimeRemaining = () => {
      const now = new Date()
      const dueDate = new Date(task.dueDate!)
      const timeDiff = dueDate.getTime() - now.getTime()

      if (timeDiff <= 0) {
        setTimeRemaining(0)
        setProgressPercent(0)
        return
      }

      setTimeRemaining(timeDiff)

      // Calculate progress based on creation time and due date
      const creationTime = Number.parseInt(task.id)
      const totalDuration = dueDate.getTime() - creationTime
      const elapsed = now.getTime() - creationTime
      const progress = Math.max(0, Math.min(100, 100 - (elapsed / totalDuration) * 100))

      setProgressPercent(progress)
    }

    updateTimeRemaining()
    const interval = setInterval(updateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [task.dueDate, task.id])

  const handleToggleComplete = () => {
    const updatedTask = { ...task, completed: !task.completed }
    updateTask(updatedTask)
    TaskManager.updateTask(updatedTask)
  }

  const handleRemove = () => {
    removeTask(task.id)
    TaskManager.deleteTask(task.id)
  }

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) return

    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    }

    updateTask(updatedTask)
    TaskManager.updateTask(updatedTask)
    setIsEditing(false)
  }

  const formatTimeRemaining = (ms: number) => {
    if (ms <= 0) return "Overdue"

    const seconds = Math.floor((ms / 1000) % 60)
    const minutes = Math.floor((ms / (1000 * 60)) % 60)
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
    const days = Math.floor(ms / (1000 * 60 * 60 * 24))

    if (days > 0) return `${days}d ${hours}h remaining`
    if (hours > 0) return `${hours}h ${minutes}m remaining`
    return `${minutes}m ${seconds}s remaining`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card className={`${task.completed ? "bg-muted/50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox checked={task.completed} onCheckedChange={handleToggleComplete} className="mt-1" />

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Task title"
                  className="font-medium"
                />
                <Input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Task description (optional)"
                />
              </div>
            ) : (
              <>
                <h3 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p
                    className={`text-sm mt-1 ${task.completed ? "line-through text-muted-foreground" : "text-muted-foreground"}`}
                  >
                    {task.description}
                  </p>
                )}

                {task.dueDate && (
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</span>
                    </div>

                    {timeRemaining !== null && !task.completed && (
                      <>
                        <Progress value={progressPercent} className="h-2" />
                        <p
                          className={`text-xs font-medium ${timeRemaining <= 0 ? "text-red-500" : "text-muted-foreground"}`}
                        >
                          {formatTimeRemaining(timeRemaining)}
                        </p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 flex justify-end gap-2 border-t">
        {isEditing ? (
          <>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" variant="default" onClick={handleSaveEdit}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-500" onClick={handleRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}
