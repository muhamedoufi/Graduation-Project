import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
import {isProduction} from "../utils";
// dotenv.config({
//     path: isProduction ? ".env" : ".env.local"
// });

const HOST_ENDPOINT = process.env.DB_HOST_ENDPOINT!,
    DATABASE = process.env.DB_NAME!,
    USERNAME = process.env.DB_USER!,
    PASSWORD = process.env.DB_PASSWORD;

const sequelize = new Sequelize('trainerize', 'root', '', {
    host: HOST_ENDPOINT,
    dialect: 'mysql',
    logging: console.log // Enable logging to see SQL queries

});

export default sequelize;