"use client";

import { useState, useEffect } from "react";
import { TaskFactory } from "@/components/TaskFactory";
import { TaskManager } from "@/lib/TaskManager";
import { TaskSortingStrategy } from "@/lib/TaskSortingStrategy";
import { useTaskStore } from "@/store/taskStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { Task } from "@/types/task";

export default function Home() {
  const { tasks, loading, fetchTasks, addTask } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [taskType, setTaskType] = useState<"basic" | "checklist" | "timed">("basic");
  const [sortStrategy, setSortStrategy] = useState("date");
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    let sorted;
    switch (sortStrategy) {
      case "date": sorted = TaskSortingStrategy.sortByDate([...tasks]); break;
      case "name": sorted = TaskSortingStrategy.sortByName([...tasks]); break;
      case "id": sorted = TaskSortingStrategy.sortById([...tasks]); break;
      default: sorted = [...tasks];
    }
    setSortedTasks(sorted);
  }, [tasks, sortStrategy]);

  const handleAddTask = async () => {
    if (!title.trim()) return;
    
    await addTask({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      type: taskType,
      completed: false,
      ...(taskType === "checklist" ? { items: [] } : {}),
    });

    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        To-Do List with Design Patterns
      </h1>

      <div className="grid gap-6 mb-8">
        <div className="grid gap-4 p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium mb-1 block"
                >
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                />
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="text-sm font-medium mb-1 block"
                >
                  Due Date (optional)
                </label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-sm font-medium mb-1 block"
              >
                Description (optional)
              </label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
            </div>
            <div>
              <label
                htmlFor="taskType"
                className="text-sm font-medium mb-1 block"
              >
                Task Type
              </label>
              <Select
                value={taskType}
                onValueChange={(value) =>
                  setTaskType(value as "basic" | "checklist" | "timed")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic" disabled={!!dueDate}>
                    Basic Task
                  </SelectItem>
                  <SelectItem value="timed" disabled={!dueDate}>
                    Timed Task
                  </SelectItem>
                  <SelectItem value="checklist" disabled={!dueDate}>
                    Checklist Task
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => handleAddTask()} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        </div>

        <div className="border rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sortStrategy} onValueChange={setSortStrategy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Due Date</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="id">Created</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="timed">Timed</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {sortedTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No tasks yet. Add your first task above!
                </p>
              ) : (
                sortedTasks.map((task) => (
                  <TaskFactory key={task.id} task={task} />
                ))
              )}
            </TabsContent>

            <TabsContent value="basic" className="space-y-4">
              {sortedTasks.filter((t) => t.type === "basic").length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No basic tasks yet.
                </p>
              ) : (
                sortedTasks
                  .filter((t) => t.type === "basic")
                  .map((task) => <TaskFactory key={task.id} task={task} />)
              )}
            </TabsContent>

            <TabsContent value="timed" className="space-y-4">
              {sortedTasks.filter((t) => t.type === "timed").length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No timed tasks yet.
                </p>
              ) : (
                sortedTasks
                  .filter((t) => t.type === "timed")
                  .map((task) => <TaskFactory key={task.id} task={task} />)
              )}
            </TabsContent>

            <TabsContent value="checklist" className="space-y-4">
              {sortedTasks.filter((t) => t.type === "checklist").length ===
              0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No checklist tasks yet.
                </p>
              ) : (
                sortedTasks
                  .filter((t) => t.type === "checklist")
                  .map((task) => <TaskFactory key={task.id} task={task} />)
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
