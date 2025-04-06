import { CorsOptions } from 'cors';

/**
 * CORS configuration options.
 *
 * This configuration allows requests from specified origins.
 * If the origin of the request is in the allowedOrigins list,
 * the request is permitted; otherwise, an error is returned.
 *
 * @type {CorsOptions}
 */
export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [process.env.FRONTEND_URL];

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Access denied by CORS policy'));
    }
  },
};
