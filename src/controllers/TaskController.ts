import { Request, Response } from 'express';
import Task from '../models/Task';
import Project from '../models/Project';

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const task = new Task(req.body);

      task.project = req.project.id;
      req.project.tasks.push(task.id);

      await Promise.allSettled([task.save(), req.project.save()]);

      res.status(201).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
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
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findOne({
        _id: taskId,
        project: req.project.id,
      });

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;

      const task = await Task.findOne({
        _id: taskId,
        project: req.project.id,
      });

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findOne({ _id: taskId, project: req.project.id });

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      await Task.findByIdAndDelete(taskId);
      await Project.findByIdAndUpdate(req.project.id, {
        $pull: { tasks: taskId },
      });

      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  static updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findOne({ _id: taskId, project: req.project.id });

      if (!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }

      const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
        new: true,
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}
