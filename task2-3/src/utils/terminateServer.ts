import { Server } from 'http';
import logger from '../middleware/logger';

export const terminate = (server: Server) => {
    return (code: any, reason: any) => (err: any) => {
        logger.error(reason);
        if (err && err instanceof Error) {
            logger.error(err.stack);
        }

        server.close(() => {
            process.exit(code);
        });

        setTimeout(() => {
            process.exit(0);
        }, 1000).unref();
    };
};
