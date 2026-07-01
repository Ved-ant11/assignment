"use client";

import { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskItem } from "@/components/TaskItem";
import { fetchTasks, createTask, updateTask, deleteTask, Task } from "@/lib/api";
import { CheckCircle2, ListTodo } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (title: string) => {
    const newTask = await createTask(title);
    setTasks([newTask, ...tasks]);
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    const updatedTask = await updateTask(id, completed);
    setTasks(tasks.map((t) => (t._id === id ? updatedTask : t)));
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">
            Task Manager
          </h1>
          <p className="text-gray-500 dark:text-neutral-400">
            Keep track of your daily goals and activities
          </p>
        </div>

        {/* Stats */}
        {!loading && !error && tasks.length > 0 && (
          <div className="flex justify-between items-center mb-6 px-2 text-sm font-medium text-gray-500 dark:text-neutral-400">
            <span>Total: {tasks.length}</span>
            <span>Completed: {completedCount}</span>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-neutral-800">
          
          <TaskForm onAddTask={handleAddTask} />

          <div className="mt-8">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-4 text-center border border-red-100 dark:bg-red-950/30 dark:border-red-900/50 dark:text-red-400">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p>Loading tasks...</p>
              </div>
            ) : tasks.length === 0 && !error ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 dark:text-neutral-500">
                <ListTodo className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg">No tasks yet</p>
                <p className="text-sm">Add one above to get started</p>
              </div>
            ) : (
              <div className="space-y-1">
                {tasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
