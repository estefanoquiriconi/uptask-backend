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

export default router;
