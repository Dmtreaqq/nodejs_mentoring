import { Sequelize } from 'sequelize';
import config from '../config/index';
import logger from '../middleware/logger';

export const sequelize = new Sequelize({
    database: config.dbName,
    username: config.dbUserName,
    password: config.dbPass,
    host: config.dbHost,
    dialect: 'postgres',
    logging: false
});

const checkDB = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
};

checkDB();
