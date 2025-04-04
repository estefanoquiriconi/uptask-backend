import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

interface ValidationSchemas {
  params?: ZodSchema<any>;
  body?: ZodSchema<any>;
  query?: ZodSchema<any>;
}

/**
 * Creates a middleware that validates request data against provided Zod schemas
 *
 * @function validateRequest
 * @param {ValidationSchemas} schemas - Object containing Zod schemas for validation
 * @param {ZodSchema<any>} [schemas.params] - Schema for validating request parameters
 * @param {ZodSchema<any>} [schemas.body] - Schema for validating request body
 * @param {ZodSchema<any>} [schemas.query] - Schema for validating query string parameters
 * @returns {(req: Request, res: Response, next: NextFunction) => void} Express middleware function
 *
 * @example
 * // Validate only request body
 * router.post('/users', validateRequest({ body: userSchema }), userController.createUser);
 *
 * @example
 * // Validate both params and body
 * router.put('/users/:id', validateRequest({
 *   params: idSchema,
 *   body: updateUserSchema
 * }), userController.updateUser);
 */
export const validateRequest = ({
  params,
  body,
  query,
}: ValidationSchemas): ((
  req: Request,
  res: Response,
  next: NextFunction
) => void) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * Validates data against the provided schema
     *
     * @param {ZodSchema<any>} schema - Zod schema to validate against
     * @param {any} data - Data to validate
     * @returns {boolean} Whether validation passed
     */
    const validate = (schema: ZodSchema<any>, data: any): boolean => {
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
