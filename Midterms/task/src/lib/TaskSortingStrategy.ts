import type { Task } from "@/types/task"

// Strategy Pattern: Different strategies for sorting tasks
export class TaskSortingStrategy {
  // Sort tasks by due date (earliest first)
  public static sortByDate(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      // Tasks without due dates go to the end
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  }

  // Sort tasks by name (alphabetically)
  public static sortByName(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
  }

  // Sort tasks by ID (creation time, newest first)
  public static sortById(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
  }

  // Sort tasks by completion status (incomplete first)
  public static sortByCompletion(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => {
      if (a.completed === b.completed) return 0
      return a.completed ? 1 : -1
    })
  }

  // Sort tasks by type
  public static sortByType(tasks: Task[]): Task[] {
    return [...tasks].sort((a, b) => a.type.localeCompare(b.type))
  }
}
