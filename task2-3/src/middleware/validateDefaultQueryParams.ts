import { NextFunction, Request, Response } from 'express';

export const validateDefaultQueryParams = (req: Request, res: Response, next: NextFunction) => {
    if (!req.query) {
        req.query = {
            limit: '3',
            filter: ''
        };
    }

    if (!req.query.limit) {
        req.query.limit = '3';
    }

    if (!req.query.filter) {
        req.query.filter = '';
    }

    next();
};
