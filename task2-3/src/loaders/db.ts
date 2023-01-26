import { Sequelize } from 'sequelize';
import config from '../config/index';

export const sequelize = new Sequelize({
    database: config.dbName,
    username: config.dbUserName,
    password: config.dbPass,
    host: config.dbHost,
    dialect: 'postgres'
});

const checkDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

checkDB();
