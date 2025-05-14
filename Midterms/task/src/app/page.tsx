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
  const [taskType, setTaskType] = useState<"basic" | "checklist" | "timed">(
    "basic"
  );
  const [sortStrategy, setSortStrategy] = useState("date");
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    let sorted;
    switch (sortStrategy) {
      case "date":
        sorted = TaskSortingStrategy.sortByDate([...tasks]);
        break;
      case "name":
        sorted = TaskSortingStrategy.sortByName([...tasks]);
        break;
      case "id":
        sorted = TaskSortingStrategy.sortById([...tasks]);
        break;
      default:
        sorted = [...tasks];
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
    <main className="container mx-auto p-6 max-w-6xl">
 

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Add Task */}
        <div className="p-6 rounded-2xl shadow-md bg-[#FFC5A6]">
          <h2 className="text-2xl font-semibold mb-4 text-[#58545F]">
            Add New Task
          </h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-[#58545F] block"
                >
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  className="bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="dueDate"
                  className="text-sm font-medium text-[#58545F] block"
                >
                  Due Date (optional)
                </label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-[#58545F] block"
                >
                  Description (optional)
                </label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description"
                  className="bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="taskType"
                  className="text-sm font-medium text-[#58545F] block"
                >
                  Task Type
                </label>
                <Select
                  value={taskType}
                  onValueChange={(value) => setTaskType(value as any)}
                >
                  <SelectTrigger className="bg-white">
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

              <Button
                onClick={handleAddTask}
                className="w-full bg-[#FDAC98] hover:bg-[#DC8E90] text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Task List */}
        <div className="p-6 rounded-2xl shadow-md bg-white border border-[#A97882]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-[#58545F]">
              Your Tasks
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#58545F]">Sort by:</span>
              <Select value={sortStrategy} onValueChange={setSortStrategy}>
                <SelectTrigger className="w-[150px] bg-white">
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
            <TabsList className="mb-4 bg-[#FDAC98]/30">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-[#FDAC98]"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-[#FDAC98]"
              >
                Basic
              </TabsTrigger>
              <TabsTrigger
                value="timed"
                className="data-[state=active]:bg-[#FDAC98]"
              >
                Timed
              </TabsTrigger>
              <TabsTrigger
                value="checklist"
                className="data-[state=active]:bg-[#FDAC98]"
              >
                Checklist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {sortedTasks.length === 0 ? (
                <p className="text-center text-[#A97882] py-6">
                  No tasks yet. Add your first task!
                </p>
              ) : (
                sortedTasks.map((task) => (
                  <TaskFactory key={task.id} task={task} />
                ))
              )}
            </TabsContent>

            {["basic", "timed", "checklist"].map((type) => (
              <TabsContent value={type} key={type} className="space-y-4">
                {sortedTasks.filter((t) => t.type === type).length === 0 ? (
                  <p className="text-center text-[#A97882] py-6">
                    No {type} tasks yet.
                  </p>
                ) : (
                  sortedTasks
                    .filter((t) => t.type === type)
                    .map((task) => <TaskFactory key={task.id} task={task} />)
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </main>
  );
}
