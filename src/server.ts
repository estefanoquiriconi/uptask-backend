import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';
import { corsConfig } from './config/cors';

connectDB();

const app: Express = express();

app.use(express.json());

app.use(morgan('dev'));

app.use(cors(corsConfig));

app.use('/api/projects', projectRoutes);

export default app;
