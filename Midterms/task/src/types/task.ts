export interface ChecklistItem {
    id: string
    text: string
    completed: boolean
  }
  
  export interface Task {
    id: string
    title: string
    description?: string 
    dueDate?: string | null
    type: "basic" | "timed" | "checklist"
    completed: boolean
    items?: ChecklistItem[] | null
    created_at?: string
  }
  

