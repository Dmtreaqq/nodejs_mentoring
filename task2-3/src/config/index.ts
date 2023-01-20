import * as dotenv from 'dotenv';
dotenv.config();

export default {
    apiPort: process.env.API_PORT,
    dbName: process.env.DB_NAME,
    dbUserName: process.env.DB_USERNAME,
    dbPass: process.env.DB_PASS,
    dbHost: process.env.DB_HOST
};
