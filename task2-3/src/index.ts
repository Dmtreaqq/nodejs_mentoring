import { app } from './app';
import config from './config/index';
import { sequelize } from './loaders/db';
import logger from './middleware/logger';

const PORT = config.apiPort || 3000;

app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
}).on('close', () => {
    sequelize.close();
});

process.on('unhandledRejection', (reason) => {
    logger.error('unhandledRejection', reason);
});

process.on('uncaughtException', (err) => {
    logger.error('UncaughtException', err.message);
    logger.error(err);
    process.exit(1);
});
