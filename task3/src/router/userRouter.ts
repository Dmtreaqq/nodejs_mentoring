import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { Op } from 'sequelize';
import { ValidatedRequest } from 'express-joi-validation';
import { UserModel } from '../models/UserModel';
import { UserRequestSchema, validator } from '../middleware/validator';
import { UserValidationSchema } from '../schemas/User';
import { User } from '../types/User';
import { validateDefaultQueryParams } from '../middleware/validateDefaultQueryParams';

export const userRouter = express.Router();

userRouter.param('id', async (req: Request, res: Response, next, id) => {
    const userFromDb = await UserModel.findByPk(id);
    const userById = userFromDb?.dataValues;
    const mappedUserById: User = {
        id: userById.id,
        age: userById.age,
        login: userById.login,
        password: userById.password,
        isDeleted: userById.is_deleted
    };

    if (userById) req.user = mappedUserById;
    next();
});

userRouter.route('/users')
    .get(validateDefaultQueryParams, async (req: Request, res: Response) => {
        const { limit, filter } = req.query;
        // const suggestedUsers = getAutoSuggestUsers(String(filter), String(limit));

        const usersFromDB = await UserModel.findAll({
            where: {
                login: {
                    [Op.substring]: String(filter)
                }
            },
            order: ['login'],
            limit: Number(limit)
        });


        const response = usersFromDB.map((user): User => ({
            id: user.dataValues.id,
            age: user.dataValues.age,
            login: user.dataValues.login,
            password: user.dataValues.password,
            isDeleted: user.dataValues.is_deleted
        }));

        res.json(response);
    })
    .post(validator.body(UserValidationSchema),
        async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const user: User = { ...req.body, id: uuid() };
            await UserModel.create({
                id: user.id,
                login: user.login,
                password: user.password,
                age: user.age,
                is_deleted: user.isDeleted
            });
            res.status(201);
            res.send(`User with id ${user.id} successfully created`);
        });

userRouter.route('/users/:id')
    .get(async (req: Request, res: Response) => {
        const userById = req.user;
        const { id } = req.params;

        if (!userById) {
            res.status(404);
            return res.send({ message: `User with id ${id} was not found` });
        }

        const response: User = {
            id: userById.id,
            age: userById.age,
            isDeleted: userById.isDeleted,
            login: userById.login,
            password: userById.password
        };

        res.json(response);
    })
    .put(validator.body(UserValidationSchema),
        async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
            const userById = req.user;
            const id = userById.id;

            if (!userById) {
                res.status(404);
                return res.send({ message: `User with id ${id} was not found` });
            }

            const userFromDb = await UserModel.findByPk(id);
            const userFromBody = req.body;

            await userFromDb?.update({
                age: userFromBody.age,
                is_deleted: userFromBody.isDeleted,
                login: userFromBody.login,
                password: userFromBody.password
            });

            res.json(`User with id ${id} successfully edited`);
        })
    .delete(async (req: Request, res: Response) => {
        const userById = req.user;
        const id = userById.id;

        if (!userById) {
            res.status(404);
            return res.send({ message: `User with id ${id} was not found` });
        }

        const userFromDb = await UserModel.findByPk(id);

        await userFromDb?.update({
            age: userById.age,
            is_deleted: true,
            login: userById.login,
            password: userById.password
        });

        res.json(`User with id ${id} successfully deleted`);
    });

userRouter.use((req, res) => {
    res.status(404).json({ message: 'Path not found' });
});
