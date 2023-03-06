import express, { Express } from 'express';

export function createServer(configure: any): Express {
    const app = express();
    app.use(express.json());
    configure(app);
    return app;
}
