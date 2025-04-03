import { z } from 'zod';

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export const mongoIdSchema = z
  .object({
    id: z.string().regex(MONGO_ID_REGEX, {
      message:
        'ID must be a valid MongoDB ObjectId (24 hexadecimal characters)',
    }),
  })
  .describe('Validation schema for MongoDB IDs');
