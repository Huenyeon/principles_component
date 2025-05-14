import { create } from "zustand";
import { Task } from "@/types/task";
import { TaskManager } from "@/lib/TaskManager";


interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: any) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await TaskManager.getAllTasks();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true });
    try {
      const createdTask = await TaskManager.addTask(task);
      if (createdTask) {
        set((state) => ({ tasks: [...state.tasks, createdTask], loading: false }));
      }
    } catch (error) {
      set({ error: 'Failed to add task', loading: false });
    }
  },

  updateTask: async (task) => {
    set({ loading: true });
    try {
      const updatedTask = await TaskManager.updateTask(task);
      if (updatedTask) {
        set((state) => ({
          tasks: state.tasks.map(t => t.id === task.id ? updatedTask : t),
          loading: false
        }));
      }
    } catch (error) {
      set({ error: 'Failed to update task', loading: false });
    }
  },

  removeTask: async (id) => {
    set({ loading: true });
    try {
      const success = await TaskManager.deleteTask(id);
      if (success) {
        set((state) => ({
          tasks: state.tasks.filter(t => t.id !== id),
          loading: false
        }));
      }
    } catch (error) {
      set({ error: 'Failed to delete task', loading: false });
    }
  }
}));