import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { TaskController } from '../controllers/TaskController';
import { validateRequest, validateProjectExists } from '../middlewares';
import { projectSchema, mongoIdSchema, taskSchema } from '../validations';

const router: Router = Router();

router.post(
  '/',
  validateRequest({ body: projectSchema }),
  ProjectController.createProject
);
router.get('/', ProjectController.getAllProject);

router.get(
  '/:id',
  validateRequest({ params: mongoIdSchema }),
  ProjectController.getProjectById
);

router.put(
  '/:id',
  validateRequest({ params: mongoIdSchema, body: projectSchema }),
  ProjectController.updateProject
);

router.delete(
  '/:id',
  validateRequest({ params: mongoIdSchema }),
  ProjectController.deleteProject
);

/** Routes for tasks **/
router.post(
  '/:projectId/tasks',
  validateRequest({ params: mongoIdSchema, body: taskSchema }),
  validateProjectExists,
  TaskController.createTask
);

router.get(
  '/:projectId/tasks',
  validateRequest({ params: mongoIdSchema }),
  validateProjectExists,
  TaskController.getProjectTasks
);

router.get(
  '/:projectId/tasks/:taskId',
  validateRequest({ params: mongoIdSchema }),
  validateProjectExists,
  TaskController.getTaskById
);

export default router;
