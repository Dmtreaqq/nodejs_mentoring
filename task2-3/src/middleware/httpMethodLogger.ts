import { NextFunction, Request, Response } from 'express';
import logger from './logger';


export const httpMethodLogger = (req: Request, res: Response, next: NextFunction) => {
    const startRequestTime = Date.now();

    res.on('finish', () => {
        const responseTime = Date.now() - startRequestTime;
        const { method, originalUrl } = req;
        const { statusCode } = res;

        logger.info(`${method} ${originalUrl} ${statusCode} - ~${responseTime} ms`);
    });

    next();
};
