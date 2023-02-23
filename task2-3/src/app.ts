import express from 'express';
import { httpMethodLogger } from './middleware/httpMethodLogger';
import { groupRouter } from './routers/groupRouter';
import { userRouter } from './routers/userRouter';
import { httpErrorLogger } from './middleware/httpErrorLogger';

export const app = express();

app.use(express.json());
app.use(httpMethodLogger);

app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.get('/health', (req, res) => {
    res.status(200).send('ok');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
});

app.use(httpErrorLogger);
