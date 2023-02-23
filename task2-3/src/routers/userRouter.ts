import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { ValidatedRequest } from 'express-joi-validation';
import { UserRequestSchema, validator } from '../middleware/validator';
import { UserValidationSchema } from '../schemas/User';
import { User } from '../types/User';
import { validateDefaultQueryParams } from '../middleware/validateDefaultQueryParams';
import userService from '../services/userService';

export const userRouter = express.Router();

userRouter.param('id', async (req: Request, res: Response, next, id) => {
    const user = await userService.getUserById(id);

    if (user) req.user = user;
    else {
        res.status(404);
        return res.json({ message: `User with id ${id} was not found` });
    }
    next();
});

userRouter.route('/')
    .get(validateDefaultQueryParams, async (req: Request, res: Response) => {
        const { limit, filter } = req.query;
        const users = await userService.getUsersByLogin(String(filter), String(limit));
        return res.json(users);
    })
    .post(validator.body(UserValidationSchema),
        async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const user: User = { ...req.body, id: uuid() };
            await userService.postUser(user);
            res.status(201);
            return res.json({ message: `User with id ${user.id} successfully created` });
        });

userRouter.route('/:id')
    .get(async (req: Request, res: Response) => {
        const userById = req.user;

        return res.json(userById);
    })
    .put(validator.body(UserValidationSchema),
        async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const userById = req.user;
            const { id } = userById;
            const userFromBody = req.body;

            await userService.editUser(id, userFromBody);

            return res.json(`User with id ${id} successfully edited`);
        })
    .delete(async (req: Request, res: Response) => {
        const userById = req.user;
        const { id } = userById;

        await userService.deleteUser(id);

        return res.json(`User with id ${id} successfully deleted`);
    });
