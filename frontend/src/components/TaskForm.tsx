"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface TaskFormProps {
  onAddTask: (title: string) => Promise<void>;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    if (title.length > 100) {
      setError("Task title is too long (max 100 chars)");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onAddTask(title);
      setTitle("");
    } catch (err) {
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-2 relative">
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm dark:text-white"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Plus size={20} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm pl-1">{error}</p>}
      </div>
    </form>
  );
}
