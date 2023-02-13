import { NextFunction, Request, Response } from 'express';

export const httpErrorLogger = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.json({ error: err.message });
    return undefined;
};
