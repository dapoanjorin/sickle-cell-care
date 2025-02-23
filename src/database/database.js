// const { Sequelize } = require('sequelize');
// require('dotenv').config();
//
// const sequelize = new Sequelize(process.env.POSTGRES_URI, {
//     dialect: 'postgres',
//     logging: false,
// });
//
// module.exports = sequelize;

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    development: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Allows self-signed SSL certificates
            }
        }
    },
    production: {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
};
