"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const Task_1 = require("../models/Task");
// Validation schemas
const createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(100),
});
const updateTaskSchema = zod_1.z.object({
    completed: zod_1.z.boolean(),
});
const getTasks = async (req, res) => {
    const tasks = await Task_1.Task.find().sort({ createdAt: -1 });
    res.json(tasks);
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    const { title } = createTaskSchema.parse(req.body);
    const task = await Task_1.Task.create({ title });
    res.status(201).json(task);
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { completed } = updateTaskSchema.parse(req.body);
    const task = await Task_1.Task.findByIdAndUpdate(id, { completed }, { new: true });
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    res.json(task);
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const { id } = req.params;
    const task = await Task_1.Task.findByIdAndDelete(id);
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }
    res.json({ message: 'Task deleted successfully' });
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.controller.js.map