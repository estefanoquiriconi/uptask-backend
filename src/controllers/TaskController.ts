import { Request, Response } from 'express';
import Task from '../models/Task';
import Project from '../models/Project';

export class TaskController {
  private static handleError(error: any, res: Response) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }

  private static async findTaskInProject(taskId: string, projectId: string) {
    return await Task.findOne({
      _id: taskId,
      project: projectId,
    });
  }

  private static sendNotFoundResponse(res: Response) {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }

  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);

      task.project = req.project.id;
      req.project.tasks.push(task.id);

      await Promise.allSettled([task.save(), req.project.save()]);

      res.status(201).json({ task, message: 'Tarea creada' });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({ project: req.project.id }).populate(
        'project',
        'projectName clientName description'
      );
      res.status(200).json(tasks);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await this.findTaskInProject(taskId, req.project.id);

      if (!task) {
        this.sendNotFoundResponse(res);
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      this.handleError(error, res);
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await this.findTaskInProject(taskId, req.project.id);

      if (!task) {
        this.sendNotFoundResponse(res);
        return;
      }

      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });

      res.status(200).json({ task: updatedTask, message: 'Tarea actualizada' });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await this.findTaskInProject(taskId, req.project.id);

      if (!task) {
        this.sendNotFoundResponse(res);
        return;
      }

      await Task.findByIdAndDelete(taskId);
      await Project.findByIdAndUpdate(req.project.id, {
        $pull: { tasks: taskId },
      });

      res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
      this.handleError(error, res);
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await this.findTaskInProject(taskId, req.project.id);

      if (!task) {
        this.sendNotFoundResponse(res);
        return;
      }

      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });

      res
        .status(200)
        .json({ task: updatedTask, message: 'Estado de la tarea actualizado' });
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
