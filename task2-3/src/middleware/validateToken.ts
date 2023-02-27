import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401);
        return res.send({ message: 'No token provided' });
    }

    jwt.verify(token, 'helloworld', (err) => {
        if (err) {
            res.status(403);
            return res.json({ message: 'Invalid token provided' });
        }

        return next();
    });
};
