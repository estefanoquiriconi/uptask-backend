import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidationSchemas {
  params?: ZodSchema<any>;
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
}

export const validateRequest = ({ params, body, query }: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validate = (schema: ZodSchema<any>, data: any) => {
      const result = schema.safeParse(data);
      if (!result.success) {
        res.status(400).json({ errors: result.error.flatten() });
        return false;
      }
      return true;
    };

    if (params && !validate(params, req.params)) return;
    if (body && !validate(body, req.body)) return;
    if (query && !validate(query, req.query)) return;

    next();
  };
};
