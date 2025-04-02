import express, { Express } from 'express';
import { connectDB } from './config/db';

connectDB();

const app: Express = express();

export default app;
