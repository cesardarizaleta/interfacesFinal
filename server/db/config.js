// server/db/config.js
require('dotenv').config();
const { config } = require('./../config/config');

module.exports = {
    development: {
        url: config.db_url,
        dialect: 'postgres',
        logging: config.isProd ? false : true, // No loguear en producción
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // For development
            }
        }
    },
    production: {
        url: config.db_url,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, // Obligatorio usar SSL
                rejectUnauthorized: true, // Requerir que el certificado del servidor sea válido
            }
        },
        logging: false, // No loguear en producción
    },
};
