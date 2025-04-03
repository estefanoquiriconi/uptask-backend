import { z } from 'zod';

export const projectSchema = z.object({
  projectName: z.string().min(3).max(100),
  clientName: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
});
