const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Importar todas las definiciones de esquemas
const userSchemas = require('./schemas/users');
const colorSchemas = require('./schemas/colors');
const fontSchemas = require('./schemas/fonts');
const gallerySchemas = require('./schemas/gallery');
const authSchemas = require('./schemas/auth');

// Importar todas las definiciones de paths
const userPaths = require('./paths/users');
const colorPaths = require('./paths/colors');
const fontPaths = require('./paths/fonts');
const galleryPaths = require('./paths/gallery');
const authPaths = require('./paths/auth');
const profilePaths = require('./paths/profile');
const adminPaths = require('./paths/admin');

// Importar componentes reutilizables
const components = require('./components/index');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Landing Photography API',
      version: '1.0.0',
      description: `
        API completa para el sistema de gestión de Landing Photography.

        ## Características principales:
        - Gestión de usuarios y autenticación JWT
        - Administración de paletas de colores personalizadas
        - Gestión de fuentes tipográficas
        - Galería multimedia organizada por categorías
        - Panel administrativo completo

        ## Autenticación:
        Todos los endpoints protegidos requieren un token JWT válido en el header:
        \`Authorization: Bearer <token>\`

        ## Roles de usuario:
        - **user**: Usuario estándar con acceso limitado
        - **admin**: Administrador con acceso completo al sistema
      `,
      contact: {
        name: 'Landing Photography Team',
        email: 'support@landingphotography.com',
        url: 'https://landingphotography.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Entorno de desarrollo',
      },
      {
        url: 'https://api.landingphotography.com',
        description: 'Entorno de producción',
      },
    ],
    components: {
      ...components,
      schemas: {
        ...userSchemas,
        ...colorSchemas,
        ...fontSchemas,
        ...gallerySchemas,
        ...authSchemas,
      },
    },
    paths: {
      ...authPaths,
      ...userPaths,
      ...colorPaths,
      ...fontPaths,
      ...galleryPaths,
      ...profilePaths,
      ...adminPaths,
    },
    security: [
      {
        bearerAuth: []
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Endpoints de autenticación y gestión de sesiones'
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios del sistema'
      },
      {
        name: 'Colors',
        description: 'Administración de paletas de colores'
      },
      {
        name: 'Fonts',
        description: 'Gestión de fuentes tipográficas'
      },
      {
        name: 'Gallery',
        description: 'Administración de galería multimedia'
      },
      {
        name: 'Profile',
        description: 'Gestión del perfil de usuario'
      },
      {
        name: 'Admin',
        description: 'Funciones administrativas del sistema'
      }
    ]
  },
  apis: [], // No necesitamos archivos externos ya que todo está modularizado
};

const specs = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  // Configuración personalizada de Swagger UI
  const swaggerOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      syntaxHighlight: {
        activate: true,
        theme: 'arta'
      },
      tryItOutEnabled: true,
      requestInterceptor: (req) => {
        // Agregar automáticamente el token si existe en localStorage
        const token = req.headers.Authorization;
        if (token) {
          req.headers.Authorization = token;
        }
        return req;
      },
      responseInterceptor: (res) => {
        return res;
      }
    },
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2D3748 }
      .swagger-ui .scheme-container { background: #F7FAFC }
    `,
    customSiteTitle: 'Landing Photography API Documentation',
    customfavIcon: '/favicon.ico'
  };

  // Exponer la especificación JSON de OpenAPI
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, swaggerOptions));

  console.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api-docs`);
  console.log(`🔗 JSON OpenAPI disponible en: http://localhost:${port}/api-docs.json`);
};

module.exports = { swaggerDocs, specs };