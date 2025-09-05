require('dotenv').config(); // Importar dotenv al inicio
const express = require('express');
const routerApi = require('./routes');
const { setupSecurityMiddlewares, setupCors, setupStaticFiles } = require('./middlewares/setup');
const logger = require('./utils/logger');
const container = require('./container'); // Initialize dependency injection container
const app = express();
const port = process.env.PORT || 3000;

// Initialize data
const { initializeData } = require('./utils/init-data');
(async () => {
  try {
    await initializeData();
    logger.info('Data initialization completed successfully');
  } catch (error) {
    logger.error('Error initializing data:', error);
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

//swaggerDocs(app, port);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
