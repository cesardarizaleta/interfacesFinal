// server/libs/sequelize.js
const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const { setupModels } = require('./../db/models');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('config.isProd:', config.isProd);
console.log('config.db_url:', config.db_url);

const options = {
    dialect: 'postgres',
    logging: config.isProd ? false : true, // No loguear en producción
};

// Lógica SSL solo si estamos en producción
if (config.isProd) {
    options.dialectOptions = {
        ssl: {
            require: true, // Obligatorio usar SSL
            rejectUnauthorized: true, // Requerir que el certificado del servidor sea válido
        }
    };
}

console.log('Sequelize final options:', options);

const sequelize = new Sequelize(config.db_url, options);

setupModels(sequelize);

module.exports = { sequelize, models: sequelize.models };
