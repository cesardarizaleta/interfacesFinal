require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',
  db_url: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  client_urls: process.env.CLIENT_URLS.split(','),

  // PostgreSQL Configuration
  postgres: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT || 5432,
  },

  // Google Drive Configuration
  googleDrive: {
    parentFolderId: process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID || '18aAW_-s480mdT4dsH_cWEovO3BKqU0Jm',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  },
/*
  // MySQL Configuration
  mysql: {
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    host: process.env.MYSQL_DB_HOST || 'localhost',
    database: process.env.MYSQL_DB_DATABASE,
    port: process.env.MYSQL_DB_PORT || 3306,
  },

  // PgAdmin Configuration
  pgadmin: {
    email: process.env.PGADMIN_EMAIL,
    password: process.env.PGADMIN_PASSWORD,
  } */
}

module.exports = { config };
