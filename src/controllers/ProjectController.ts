import { Request, Response } from 'express';
import Project from '../models/Project';

const handleError = (error: unknown, res: Response) => {
  console.log(error);
  res.status(500).json({ error: 'Internal server error' });
};

export class ProjectController {
  static createProject = async (req: Request, res: Response) => {
    const project = new Project(req.body);

    try {
      await project.save();
      res.status(201).json({ message: 'Proyecto creado', project });
    } catch (error) {
      handleError(error, res);
    }
  };

  static getAllProject = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();
      res.status(200).json(projects);
    } catch (error) {
      handleError(error, res);
    }
  };

  static getProjectById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate(
        'tasks',
        'name description status'
      );

      if (!project) {
        res.status(404).json({ error: 'Proyecto no encontrado' });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      handleError(error, res);
    }
  };

  static updateProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!project) {
        res.status(404).json({ error: 'Proyecto no encontrado' });
        return;
      }

      res.status(200).json({ project, message: 'Proyecto actualizado' });
    } catch (error) {
      handleError(error, res);
    }
  };

  static deleteProject = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = await Project.findByIdAndDelete(id);

      if (!project) {
        res.status(404).json({ error: 'Proyecto no encontrado' });
        return;
      }

      res.status(200).json({ project, message: 'Proyecto eliminado' });
    } catch (error) {
      handleError(error, res);
    }
  };
}
