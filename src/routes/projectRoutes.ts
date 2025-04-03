import { Router } from 'express';
import { ProjectController } from '../controllers/ProjectController';
import { validateRequest } from '../middlewares';
import { projectSchema, mongoIdSchema } from '../validations';

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

export default router;
