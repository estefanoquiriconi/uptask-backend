import { Request, Response } from 'express';
import Project from '../models/Project';

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();
      res.send('Proyecto creado correctamente');
    } catch (error) {
      console.log(error);
    }
  };

  static getAllProject = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      console.log(error);
    }
  };
}
