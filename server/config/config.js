require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === 'production',
  db_url: process.env.DATABASE_URL || 'postgresql://postgres:AuraInterfaces2000AAA@db.uwlkhuxzhqkqnkwfgyua.supabase.co:5432/postgres',
  jwtSecret: process.env.JWT_SECRET,
  noReplyEmail: process.env.NO_REPLY_EMAIL,
  emailAppPassword: process.env.EMAIL_APP_PASSWORD,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  corsWhitelist: process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : ['http://localhost:3000'],

  // PostgreSQL Configuration
  postgres: {
    user: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'AuraInterfaces2000AAA',
    host: process.env.POSTGRES_HOST || 'db.uwlkhuxzhqkqnkwfgyua.supabase.co',
    database: process.env.POSTGRES_DB || 'postgres',
    port: process.env.POSTGRES_PORT || 5432,
  },
}

module.exports = { config };
