import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import { User } from '../types/User';

export const authRouter = express.Router();

authRouter.route('/login')
    .get(async (req: Request, res: Response) => {
        const { login, password } = req.body;
        const limit = '1';
        const users: User[] | undefined = await userService.getUsersByLogin(login, limit);

        if (!login || !users || users.length === 0) {
            res.status(401);
            return res.json({ message: 'Login or password is incorrect' });
        }

        const user = users[0];

        if (!password || password !== user.password) {
            res.status(401);
            return res.json({ message: 'Login or password is incorrect' });
        }

        const token = jwt.sign({ login: user.login, isDeleted: user.isDeleted }, 'helloworld', { expiresIn: 120 });

        return res.json({ token });
    });
