"use client";

import { useState } from "react";
import type { Task, ChecklistItem } from "@/types/task";
import { TaskManager } from "@/lib/TaskManager";
import { useTaskStore } from "@/store/taskStore";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Save, X, Plus, ListChecks } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface ChecklistTaskProps {
  task: Task;
}

export function ChecklistTask({ task }: ChecklistTaskProps) {
  const { updateTask, removeTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [newItemText, setNewItemText] = useState("");
  const [items, setItems] = useState<ChecklistItem[]>(task.items || []);

  const handleToggleComplete = () => {
    const updatedTask = { ...task, completed: !task.completed };
    updateTask(updatedTask);
    TaskManager.updateTask(updatedTask);
  };

  const handleRemove = () => {
    removeTask(task.id);
    TaskManager.deleteTask(task.id);
  };

  const handleSaveEdit = () => {
    if (!editedTitle.trim()) return;
    const updatedTask = { ...task, title: editedTitle, description: editedDescription, items };
    updateTask(updatedTask);
    TaskManager.updateTask(updatedTask);
    setIsEditing(false);
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text: newItemText,
      completed: false,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setNewItemText("");
    const updatedTask = { ...task, items: updatedItems };
    updateTask(updatedTask);
    TaskManager.updateTask(updatedTask);
  };

  const handleToggleItem = (itemId: string) => {
    const updatedItems = items.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item));
    setItems(updatedItems);
    const updatedTask = { ...task, items: updatedItems };
    updateTask(updatedTask);
    TaskManager.updateTask(updatedTask);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    const updatedTask = { ...task, items: updatedItems };
    updateTask(updatedTask);
    TaskManager.updateTask(updatedTask);
  };

  const calculateProgress = () => {
    if (items.length === 0) return 0;
    const completedItems = items.filter((item) => item.completed).length;
    return (completedItems / items.length) * 100;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className={`rounded-2xl shadow-md border border-[#DC8E90] ${task.completed ? "bg-[#DC8E90]" : "bg-[#FFF7F3]"}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            className="mt-1 border border-gray-400"
          />

          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Task title"
                  className="bg-white text-black font-semibold"
                />
                <Input
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder="Task description (optional)"
                  className="bg-white text-black"
                />
              </div>
            ) : (
              <>
                <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-[#58545F]"}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${task.completed ? "line-through text-gray-400" : "text-gray-600"}`}>
                    {task.description}
                  </p>
                )}
                {task.dueDate && (
                  <p className="text-xs mt-2 text-[#A97882]">
                    Due: {formatDate(task.dueDate)}
                  </p>
                )}
              </>
            )}

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <ListChecks className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Checklist</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {items.filter((item) => item.completed).length}/{items.length} completed
                </span>
              </div>

              <Progress value={calculateProgress()} className="h-2 bg-[#FFE4DE]" />

              <ul className="space-y-2 mt-2">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => handleToggleItem(item.id)}
                      className="mt-px border border-gray-400"
                    />
                    <span className={`text-sm ${item.completed ? "line-through text-muted-foreground" : "text-[#58545F]"}`}>
                      {item.text}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 ml-auto text-red-500 opacity-50 hover:opacity-100"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 mt-2">
                <Input
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="Add new item"
                  className="text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddItem();
                    }
                  }}
                />
                <Button size="sm" onClick={handleAddItem} className="bg-[#A97882] hover:bg-[#58545F] text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-2 flex justify-end gap-2 border-t border-[#FDAC98] bg-[#FFE9E1] rounded-b-2xl">
        {isEditing ? (
          <>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)} className="text-[#A97882]">
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" variant="default" onClick={handleSaveEdit} className="bg-[#A97882] hover:bg-[#58545F] text-white">
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="text-[#58545F]">
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-red-500" onClick={handleRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
