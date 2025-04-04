import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { validateRequest } from '../middlewares';
import { mongoIdSchema, taskSchema, taskStatusSchema } from '../validations';

const router: Router = Router();

router
  .route('/')
  .post(validateRequest({ body: taskSchema }), TaskController.createTask)
  .get(TaskController.getProjectTasks);

router
  .route('/:taskId')
  .get(validateRequest({ params: mongoIdSchema }), TaskController.getTaskById)
  .put(
    validateRequest({ params: mongoIdSchema, body: taskSchema }),
    TaskController.updateTask
  )
  .delete(
    validateRequest({ params: mongoIdSchema }),
    TaskController.deleteTask
  );

router.post(
  '/:taskId/status',
  validateRequest({
    params: mongoIdSchema,
    body: taskStatusSchema,
  }),
  TaskController.updateTaskStatus
);

export default router;
