import { Request, Response } from 'express';
import { z } from 'zod';
import { Task } from '../models/Task';

// Validation schemas
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
});

const updateTaskSchema = z.object({
  completed: z.boolean(),
});

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = createTaskSchema.parse(req.body);
  const task = await Task.create({ title });
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = updateTaskSchema.parse(req.body);
  
  const task = await Task.findByIdAndUpdate(
    id,
    { completed },
    { returnDocument: 'after' }
  );

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json(task);
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json({ message: 'Task deleted successfully' });
};
