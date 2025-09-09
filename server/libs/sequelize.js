// server/libs/sequelize.js
const { Sequelize } = require('sequelize');
const { config } = require('./../config/config');
const { setupModels } = require('./../db/models');
const fs = require('fs');
const path = require('path');

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('config.isProd:', config.isProd);
console.log('config.db_url:', config.db_url);

const options = {
    dialect: 'postgres',
    logging: config.isProd ? false : true, // No loguear en producción
};

// Lógica SSL solo si estamos en producción
if (config.isProd) {
    let caCert = null;

    // 1. Intentar leer el certificado de la variable de entorno POSTGRES_CA_CERT
    if (process.env.POSTGRES_CA_CERT) {
        caCert = process.env.POSTGRES_CA_CERT;
        console.log('INFO: CA certificate loaded from environment variable for app.');
    }
    // 2. Si no está en ENV, intentar leerlo de un archivo local
    else {
        const caCertPath = path.join(__dirname, '..', 'ca.crt');

        if (fs.existsSync(caCertPath)) {
            caCert = fs.readFileSync(caCertPath, 'utf8');
            console.log('INFO: CA certificate loaded from file for app.');
        } else {
            console.warn('WARNING: CA certificate file (ca.crt) not found for production app. Relying on host environment CA certificates.');
            options.dialectOptions = {
                ssl: {
                    require: true,
                    rejectUnauthorized: true,
                }
            };
        }
    }

    // Si se encontró un certificado CA, úsalo
    if (caCert) {
        options.dialectOptions = {
            ssl: {
                require: true,
                rejectUnauthorized: true,
                ca: caCert
            }
        };
    }
}

console.log('Sequelize final options:', options);

// Add diagnostic logging for DNS resolution (async check)
const dns = require('dns').promises;
const url = require('url');
const dbUrlParsed = url.parse(config.db_url);

console.log('Attempting to resolve hostname:', dbUrlParsed.hostname);

// Perform DNS check asynchronously without top-level await
dns.lookup(dbUrlParsed.hostname)
  .then(addresses => {
    console.log('DNS resolution successful for', dbUrlParsed.hostname, ':', addresses);
  })
  .catch(dnsError => {
    console.error('DNS resolution failed for', dbUrlParsed.hostname, ':', dnsError.message);
  });

const sequelize = new Sequelize(config.db_url, options);

setupModels(sequelize);

module.exports = sequelize;
