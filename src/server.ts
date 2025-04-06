import express, { Express } from 'express';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';
import cors from 'cors';
import { corsConfig } from './config/cors';

connectDB();

const app: Express = express();

app.use(express.json());

app.use(cors(corsConfig));

app.use('/api/projects', projectRoutes);

export default app;
