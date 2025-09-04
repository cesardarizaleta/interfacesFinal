const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

function setupSecurityMiddlewares(app) {
  // Helmet for security headers
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
  });
  app.use(limiter);

  return app;
}

function setupCors(app) {
  const allowedOrigins = [
    process.env.CLIENT_URL || 'http://localhost:3000',
    'http://localhost:5000', // Nuxt dev server
    'http://localhost:3000'  // Fallback
  ];

  app.use(cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true
  }));

  return app;
}

function setupStaticFiles(app) {
  // Servir archivos estáticos de la carpeta uploads
  app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.ttf') || path.endsWith('.otf')) {
        res.set('Access-Control-Allow-Origin', '*'); // Allow all origins for fonts
        res.set('Content-Type', 'font/ttf');
      }
    }
  }));

  return app;
}

module.exports = {
  setupSecurityMiddlewares,
  setupCors,
  setupStaticFiles
};
