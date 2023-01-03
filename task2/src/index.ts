import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { userRouter } from './router/userRouter';

const app = express();
const PORT = process.env.API_PORT || 3000;

app.use(express.json());

app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
});

