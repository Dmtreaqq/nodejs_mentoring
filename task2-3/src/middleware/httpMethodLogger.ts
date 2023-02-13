import { NextFunction, Request, Response } from 'express';


export const httpMethodLogger = (req: Request, res: Response, next: NextFunction) => {
    const { method, url } = req;
    const { statusCode } = res;

    const loggerString = `${method} ${url} ${statusCode}`;
    console.log(loggerString);
    next();
};
