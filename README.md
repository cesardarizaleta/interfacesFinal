# Interfaces Final

Un proyecto full-stack para gestión de interfaces de usuario, incluyendo configuraciones de colores y fuentes. Consiste en un cliente frontend construido con Nuxt.js, un servidor backend con Express y Sequelize (PostgreSQL), y una versión simplificada del backend usando JSON para almacenamiento.

## Descripción

Este proyecto permite a los usuarios crear, gestionar y personalizar configuraciones de colores y fuentes para interfaces. Incluye autenticación JWT, subida de archivos de fuentes, y perfiles de usuario.

## Características

- **Autenticación**: Registro, login y JWT para proteger rutas.
- **Gestión de Colores**: Crear, editar y eliminar paletas de colores.
- **Gestión de Fuentes**: Subir archivos TTF, configurar tamaños y familias.
- **Perfiles de Usuario**: Acceder a configuraciones personales.
- **Frontend Responsivo**: Interfaz moderna con Nuxt.js.
- **Backend Flexible**: Versión con base de datos y versión simplificada con JSON.

## Estructura del Proyecto

```
interfacesFinal/
├── client/          # Frontend Nuxt.js
│   ├── components/
│   ├── pages/
│   ├── composables/
│   └── ...
├── server/          # Backend Express con Sequelize
│   ├── routes/
│   ├── services/
│   ├── schemas/
│   ├── middlewares/
│   ├── db/
│   └── ...
├── template/        # Backend simplificado con JSON
│   ├── routes/
│   ├── services/
│   ├── data/
│   └── ...
└── README.md
```

## Instalación

### Prerrequisitos

- Node.js (v14 o superior)
- PostgreSQL (para la versión server)
- Docker (opcional)

### Cliente (Frontend)

```bash
cd client
npm install
npm run dev
```

### Servidor (Backend con DB)

```bash
cd server
npm install
# Configurar variables de entorno en .env
npm run dev
```

### Template (Backend JSON)

```bash
cd template
npm install
npm run dev
```

## Uso

### Variables de Entorno

Crear un archivo `.env` en `server/` o `template/` con:

```
PORT=3000
JWT_SECRET=your_secret_key
# Para server: POSTGRES_USER, POSTGRES_PASSWORD, etc.
```

### API Endpoints

#### Autenticación
- `POST /api/auth/login` - Iniciar sesión

#### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users/:id` - Obtener usuario por ID
- `PATCH /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

#### Colores
- `GET /api/colors` - Obtener todos los colores
- `POST /api/colors` - Crear configuración de colores (requiere JWT)
- `GET /api/colors/:id` - Obtener color por ID
- `PATCH /api/colors/:id` - Actualizar color
- `DELETE /api/colors/:id` - Eliminar color

#### Fuentes
- `GET /api/fonts` - Obtener todas las fuentes
- `POST /api/fonts` - Crear configuración de fuentes con subida de archivos (requiere JWT)
- `GET /api/fonts/:id` - Obtener fuente por ID
- `PATCH /api/fonts/:id` - Actualizar fuente
- `DELETE /api/fonts/:id` - Eliminar fuente

#### Perfil
- `GET /api/profile/my-colors` - Colores del usuario autenticado
- `GET /api/profile/my-fonts` - Fuentes del usuario autenticado
- `GET /api/profile/lastColorUsed` - Último color usado
- `GET /api/profile/lastFontUsed` - Última fuente usada

### Docker

Para la versión server con PostgreSQL:

```bash
cd server
docker-compose up --build
```

Para template:

```bash
cd template
docker-compose up --build
```

## Tecnologías

- **Frontend**: Nuxt.js, Vue.js, CSS
- **Backend**: Node.js, Express.js
- **Base de Datos**: PostgreSQL (server), JSON files (template)
- **Autenticación**: Passport.js, JWT
- **Validación**: Joi
- **Subida de Archivos**: Multer
- **ORM**: Sequelize (server)
- **Contenedores**: Docker

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
