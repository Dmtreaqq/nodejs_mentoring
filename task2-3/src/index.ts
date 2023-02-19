import { app } from './app';
import config from './config/index';
import { sequelize } from './loaders/db';
import { terminate } from './utils/terminateServer';

const PORT = config.apiPort || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server was started at port ${PORT}`);
}).on('close', () => {
    sequelize.close();
    console.log('SQL connection closed');
});

const exitHandler = terminate(server);

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
