// src/patterns/SingletonPattern.ts
export type Task = {
    id: string;
    title: string;
    dueDate?: string;
  };
  
  class TaskManager {
    private static instance: TaskManager;
    private tasks: Task[] = [];
  
    private constructor() {}
  
    public static getInstance(): TaskManager {
      if (!TaskManager.instance) TaskManager.instance = new TaskManager();
      return TaskManager.instance;
    }
  
    public addTask(task: Task) {
      this.tasks.push(task);
    }
  
    public removeTask(id: string) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  
    public getAllTasks(): Task[] {
      return [...this.tasks];
    }
  }
  
  export const TaskManagerSingleton = TaskManager.getInstance();