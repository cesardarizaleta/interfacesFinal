require('dotenv').config(); // Importar dotenv al inicio
const express = require('express');
const routerApi = require('./routes');
const { setupSecurityMiddlewares, setupCors, setupStaticFiles } = require('./middlewares/setup');
const logger = require('./utils/logger');
const sequelize = require('./libs/sequelize'); // Initialize Sequelize
const app = express();
const port = process.env.PORT || 3000;

// Initialize database connection (without sync for production safety)
(async () => {
  try {
    logger.info('Attempting to connect to database...');
    await sequelize.authenticate();
    logger.info('Database connection established successfully');

    // WARNING: sync() is DISABLED for production safety
    // Use migrations instead: npm run migrations:run
    if (process.env.NODE_ENV === 'development') {
      // Only allow sync in development with explicit confirmation
      const forceSync = process.env.FORCE_DB_SYNC === 'true';
      if (forceSync) {
        logger.warn('FORCED DATABASE SYNC ENABLED - This will drop existing tables!');
        await sequelize.sync({ force: true });
        logger.info('Database synchronized with FORCE (development only)');
      } else {
        logger.info('Database sync skipped - using migrations for schema management');
      }
    } else {
      logger.info('Production mode: Database sync disabled. Use migrations for schema changes.');
    }
  } catch (error) {
    logger.error('Error connecting to database:', {
      message: error.message,
      name: error.name,
      code: error.code,
      errno: error.errno,
      hostname: error.hostname,
      syscall: error.syscall,
      stack: error.stack
    });
    // Don't exit process, let server continue running
  }
})();

// Setup middlewares
setupSecurityMiddlewares(app);
setupCors(app);
setupStaticFiles(app);

require('./utils/auth');

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('HOLA MUNDO')
});

app.get('/', (req, res) => {
  res.send('HOLA MUNDO, pero sin api')
});

routerApi(app);

const { logErrors, errorHandler, ormErrorHandler, boomErrorHandler} = require('./middlewares/error_handler');
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Initialize Swagger Documentation
const { swaggerDocs } = require('./swagger-docs');
swaggerDocs(app, port);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
