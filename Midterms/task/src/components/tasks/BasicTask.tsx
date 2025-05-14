"use client";

import { useState } from "react";
import type { Task } from "@/types/task";
import { TaskManager } from "@/lib/TaskManager";
import { useTaskStore } from "@/store/taskStore";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BasicTaskProps {
  task: Task;
}

export function BasicTask({ task }: BasicTaskProps) {
  const { updateTask, removeTask } = useTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");

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

    const updatedTask = {
      ...task,
      title: editedTitle,
      description: editedDescription,
    };

    updateTask(updatedTask);
    TaskManager.updateTask(updatedTask);
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className={`rounded-2xl shadow-md border border-[#FDAC98] ${task.completed ? "bg-[#FFE4DE]" : "bg-[#FFF7F3]"}`}>
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
                  <p
                    className={`text-sm mt-1 ${task.completed ? "line-through text-gray-400" : "text-gray-600"}`}
                  >
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
            <Button size="sm" variant="ghost" onClick={handleRemove} className="text-red-500">
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
