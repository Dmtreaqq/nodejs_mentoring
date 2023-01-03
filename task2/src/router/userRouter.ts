import express, { Request, Response } from 'express';
import { getAutoSuggestUsers } from '../utils/getAutoSuggestUsers';
import { UserRequestSchema, validator } from '../middleware/validator';
import { UserValidationSchema } from '../schemas/User';
import { ValidatedRequest } from 'express-joi-validation';
import { User } from '../types/User';
import { v4 as uuid } from 'uuid';

export let users: User[] = [
    { age: 23, isDeleted: false, login: 'Dmytro', password: 'admin', id: uuid() },
    { age: 24, isDeleted: false, login: 'Pavlo', password: 'mod', id: uuid() },
    { age: 27, isDeleted: false, login: 'Oleh', password: 'guest', id: uuid() },
    { age: 18, isDeleted: false, login: 'Zekora', password: 'guest', id: uuid() },
    { age: 44, isDeleted: false, login: 'Artem', password: 'guest', id: uuid() },
    { age: 20, isDeleted: false, login: 'Daniel', password: 'mod', id: uuid() }
];

export const userRouter = express.Router();

userRouter.param('id', (req: Request, res: Response, next, id) => {
    const userById = users.find((user) => user.id === id);
    if (userById) req.user = userById;
    next();
});

userRouter.route('/users')
    .get((req: Request, res: Response) => {
        let { limit, filter } = req.query;
        if (!limit) limit = '10';
        if (!filter) filter = '';
        const suggestedUsers = getAutoSuggestUsers(String(filter), String(limit));

        res.json(suggestedUsers);
    })
    .post(validator.body(UserValidationSchema),
        (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const user: User = { ...req.body, id: uuid() };
            users.push(user);
            res.status(201);
            res.send(`User with id ${user.id} successfully created`);
        });

userRouter.route('/users/:id')
    .get((req: Request, res: Response) => {
        const userById = req.user;
        res.json(userById);
    })
    .put(validator.body(UserValidationSchema),
        (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const { id } = req.user;
            const userFromBody = req.body;
            users = users.map((user: User) => {
                if (user.id === id) {
                    return { ...userFromBody, id };
                }

                return user;
            });
            res.json(`User with id ${id} successfully edited`);
        })
    .delete((req: Request, res: Response) => {
        const { id } = req.user;
        users = users.map((user: User) => {
            if (user.id === id) {
                return { ...user, isDeleted: true };
            }

            return user;
        });
        res.json(`User with id ${id} successfully deleted`);
    });

userRouter.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
});
