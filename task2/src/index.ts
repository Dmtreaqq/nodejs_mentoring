import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { User } from './types/User';
import { getAutoSuggestUsers } from './utils/getAutoSuggestUsers';

const app = express();
const PORT = process.env.API_PORT || 3000;

export let users: User[] = [
    { age: 23, isDeleted: false, login: 'Dmytro', password: 'admin', id: uuid() },
    { age: 24, isDeleted: false, login: 'Pavlo', password: 'mod', id: uuid() },
    { age: 27, isDeleted: false, login: 'Oleh', password: 'guest', id: uuid() },
    { age: 18, isDeleted: false, login: 'Zekora', password: 'guest', id: uuid() },
    { age: 44, isDeleted: false, login: 'Artem', password: 'guest', id: uuid() },
    { age: 20, isDeleted: false, login: 'Daniel', password: 'mod', id: uuid() }
];

app.use(express.json());

app.param('id', (req: Request, res: Response, next, id) => {
    const userById = users.find((user) => user.id === id);
    if (userById) req.user = userById;
    next();
});

app.get('/users', (req: Request, res: Response) => {
    let { limit, filter } = req.query;
    if (!limit) limit = '10';
    if (!filter) filter = '';
    const suggestedUsers = getAutoSuggestUsers(String(filter), String(limit));

    res.json(suggestedUsers);
});

app.get('/user/:id', (req: Request, res: Response) => {
    const userById = req.user;
    res.json(userById);
});

app.post('/user', (req: Request, res: Response) => {
    const user: User = { ...req.body, id: uuid() };
    users.push(user);
    res.status(201);
    res.send(`User with login ${user.login} successfully created`);
});

app.put('/user/:id', (req: Request, res: Response) => {
    const { id } = req.user;
    const userFromBody = req.body;
    users = users.map((user: User) => {
        if (user.id === id) {
            return userFromBody;
        }

        return user;
    });
    res.json(`User with id ${id} successfully edited`);
});

app.delete('/user/:id', (req: Request, res: Response) => {
    const { id } = req.user;
    users = users.map((user: User) => {
        if (user.id === id) {
            return { ...user, isDeleted: true };
        }

        return user;
    });
    res.json(`User with id ${id} successfully deleted`);
});

// Error handling
// app.use((err, req, res, next) => {
//     res.send('Something went wrong');
// });

app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
});

