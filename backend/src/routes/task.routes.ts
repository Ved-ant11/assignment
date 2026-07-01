import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/task.controller';

const router = Router();

router.route('/').get(getTasks).post(createTask);
router.route('/:id').patch(updateTask).delete(deleteTask);

export default router;
