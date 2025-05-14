// src/lib/TaskManager.ts
import { supabase } from "@/lib/supabaseClient";
import { TaskAdapter } from "./TaskAdapter";
import type { Task } from "@/types/task";

class TaskManagerClass {
  private static instance: TaskManagerClass;

  private constructor() {}

  public static getInstance(): TaskManagerClass {
    if (!TaskManagerClass.instance) {
      TaskManagerClass.instance = new TaskManagerClass();
    }
    return TaskManagerClass.instance;
  }

  public async addTask(task: Task): Promise<Task | null> {
    try {
      // Convert to Supabase format before sending
      const supabaseTask = TaskAdapter.toApiFormat({
        ...task,
      });

      const { data, error } = await supabase
        .from("TASK")
        .insert(supabaseTask)
        .select()
        .single();

      if (error) throw error;
      
      // Convert back to app format
      return TaskAdapter.fromApiFormat(data);
    } catch (error) {
      console.error("Add task error:", error);
      return null;
    }
  }

  public async getAllTasks(): Promise<Task[]> {
  try {
    const { data, error } = await supabase
      .from("TASK")
      .select("*");
    
    if (error) throw error;
    if (!data) return []; 

    return data.map(task => {
      try {
        return TaskAdapter.fromApiFormat(task);
      } catch (e) {
        console.error("Failed to adapt task:", task, e);
        return null;
      }
    }).filter(Boolean) as Task[];
  } catch (error) {
    console.error("Get tasks error:", error);
    return [];
  }
}
  public async updateTask(task: Task): Promise<Task | null> {
    try {
      // Convert to Supabase format before updating
      const supabaseTask = TaskAdapter.toApiFormat(task);

      const { data, error } = await supabase
        .from("TASK")
        .update(supabaseTask)
        .eq("id", task.id)
        .select()
        .single();

      if (error) throw error;
      
      // Convert back to app format
      return TaskAdapter.fromApiFormat(data);
    } catch (error) {
      console.error("Update task error:", error);
      return null;
    }
  }

  public async deleteTask(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("TASK")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Delete task error:", error);
      return false;
    }
  }
}

export const TaskManager = TaskManagerClass.getInstance();