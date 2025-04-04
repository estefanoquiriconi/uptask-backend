import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { projectExists, validateRequest } from '../middlewares';
import { projectSchema, mongoIdSchema } from '../validations';
import tasksRouter from './taskRoutes';

const router: Router = Router();

router
  .route('/')
  .post(
    validateRequest({ body: projectSchema }),
    ProjectController.createProject
  )
  .get(ProjectController.getAllProject);

router
  .route('/:id')
  .get(
    validateRequest({ params: mongoIdSchema }),
    ProjectController.getProjectById
  )
  .put(
    validateRequest({ params: mongoIdSchema, body: projectSchema }),
    ProjectController.updateProject
  )
  .delete(
    validateRequest({ params: mongoIdSchema }),
    ProjectController.deleteProject
  );

/** Task routes (nested resource) **/
router.use(
  '/:projectId/tasks',
  validateRequest({ params: mongoIdSchema }),
  projectExists,
  tasksRouter
);

export default router;
