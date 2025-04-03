import { z } from 'zod';

export const projectSchema = z.object({
  projectName: z.string().min(1),
  clientName: z.string().min(1),
  description: z.string().min(1),
});
