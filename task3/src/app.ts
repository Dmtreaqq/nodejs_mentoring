import express from 'express';
import { userRouter } from './routers/userRouter';

export const app = express();

app.use(express.json());

app.use('/', userRouter);
