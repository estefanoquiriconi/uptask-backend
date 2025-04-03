import express, { Express } from 'express';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';

connectDB();

const app: Express = express();

app.use(express.json());

app.use('/api/projects', projectRoutes);

export default app;
