import { z } from 'zod';
import { TaskStatus } from '../models/Task';

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const mongoIdSchema = z.record(
  z.string().regex(MONGO_ID_REGEX, {
    message: 'Must be a valid MongoDB ObjectId (24 hexadecimal characters)',
  })
);

export const projectSchema = z.object({
  projectName: z.string().min(1),
  clientName: z.string().min(1),
  description: z.string().min(1),
});

export const taskSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const taskStatusSchema = z.object({
  status: z.nativeEnum(TaskStatus),
});
