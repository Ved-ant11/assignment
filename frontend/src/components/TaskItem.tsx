"use client";

import { Check, Trash2, X } from "lucide-react";
import { Task } from "@/lib/api";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      setIsUpdating(true);
      await onToggle(task._id, !task.completed);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 mb-3 rounded-xl border transition-all duration-200 ${
        task.completed
          ? "bg-gray-50/50 border-gray-200 dark:bg-neutral-900/50 dark:border-neutral-800"
          : "bg-white border-gray-200 shadow-sm hover:shadow-md dark:bg-neutral-900 dark:border-neutral-700"
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={handleToggle}
          disabled={isUpdating || isDeleting}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-500 dark:border-neutral-600"
          }`}
        >
          {task.completed && <Check size={14} strokeWidth={3} />}
        </button>
        <span
          className={`text-lg transition-all ${
            task.completed
              ? "text-gray-400 line-through dark:text-neutral-500"
              : "text-gray-800 dark:text-neutral-200"
          }`}
        >
          {task.title}
        </span>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting || isUpdating}
        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 focus:opacity-100 disabled:opacity-0"
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
