import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
