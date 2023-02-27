import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { httpMethodLogger } from './middleware/httpMethodLogger';
import { groupRouter } from './routers/groupRouter';
import { userRouter } from './routers/userRouter';
import { httpErrorLogger } from './middleware/httpErrorLogger';
import { authRouter } from './routers/authRouter';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'NodeJS Mentoring',
            version: '1.0.0'
        }
    },
    apis: ['./src/routers/*.ts'] // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

export const app = express();

app.use(express.json());
app.use(httpMethodLogger);
app.use(cors());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);

app.get('/health', (req, res) => {
    res.status(200).send('ok');
});

app.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
});

app.use(httpErrorLogger);
