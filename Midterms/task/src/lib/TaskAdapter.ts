import type { Task, ChecklistItem } from "@/types/task";

interface SupabaseTask {
  id?: number;
  title: string;
  description: string | null;
  dueDate: string | null;
  type: "basic" | "timed" | "checklist";
  completed: boolean;
  items: any[] | null;
  created_at?: string;
}

export class TaskAdapter {
  /**
   * Convert from Supabase format to app Task format
   */
  public static fromApiFormat(supabaseTask: SupabaseTask): Task {
    return {
      id: supabaseTask.id?.toString() || Date.now().toString(),
      title: supabaseTask.title,
      description: supabaseTask.description || undefined,
      dueDate: supabaseTask.dueDate || undefined,
      type: supabaseTask.type,
      completed: supabaseTask.completed,
      items: this.transformItems(supabaseTask.items),
      ...(supabaseTask.created_at && { createdAt: supabaseTask.created_at })
    };
  }

  /**
   * Convert from app Task format to Supabase format
   */
  public static toApiFormat(task: Task): SupabaseTask {
    return {
      ...(task.id && { id: Number(task.id) }),
      title: task.title,
      description: task.description || null,
      dueDate: task.dueDate || null,
      type: task.type,
      completed: task.completed,
      items: task.items || null
    };
  }


  private static transformItems(items: any[] | null): ChecklistItem[] | undefined {
    if (!items) return undefined;
    
    return items.map(item => ({
      id: item.id?.toString() || Date.now().toString(),
      text: item.text || "",
      completed: item.completed || false
    }));
  }
}