import express from 'express';
import { userRouter } from './router/userRouter';

export const app = express();

app.use(express.json());

app.use('/', userRouter);
