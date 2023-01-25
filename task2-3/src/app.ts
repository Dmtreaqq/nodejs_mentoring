import express from 'express';
import { groupRouter } from './routers/groupRouter';
import { userRouter } from './routers/userRouter';

export const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
});
