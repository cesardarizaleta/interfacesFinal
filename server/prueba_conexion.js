require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Client } = require('pg');
const dns = require('dns').promises;
const url = require('url');

async function testConnection() {
  console.log('=== PRUEBA DE CONEXIÓN A BASE DE DATOS ===\n');

  // 1. Verificar variables de entorno
  console.log('1. Variables de entorno:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'NO CONFIGURADA');
  console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
  console.log('POSTGRES_PORT:', process.env.POSTGRES_PORT);
  console.log();

  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL no está configurada en el archivo .env');
    return;
  }

  // 2. Parsear la URL
  const dbUrlParsed = url.parse(process.env.DATABASE_URL);
  console.log('2. Análisis de la URL de la base de datos:');
  console.log('Protocolo:', dbUrlParsed.protocol);
  console.log('Hostname:', dbUrlParsed.hostname);
  console.log('Puerto:', dbUrlParsed.port);
  console.log('Base de datos:', dbUrlParsed.pathname?.substring(1));
  console.log();

  // 3. Probar resolución DNS
  console.log('3. Probando resolución DNS...');
  try {
    const addresses = await dns.lookup(dbUrlParsed.hostname);
    console.log('✅ DNS resuelto exitosamente:');
    console.log('Dirección IP:', addresses.address);
    console.log('Familia:', addresses.family);
  } catch (dnsError) {
    console.error('❌ ERROR de DNS:', dnsError.message);
    console.log('Posibles causas:');
    console.log('- El proyecto de Supabase está pausado');
    console.log('- La URL de la base de datos es incorrecta');
    console.log('- Problemas de red o DNS local');
    return;
  }
  console.log();

  // 4. Intentar conexión con Sequelize
  console.log('4. Intentando conexión con Sequelize...');
  const options = {
    dialect: 'postgres',
    logging: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Para desarrollo con pooler
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  try {
    const sequelize = new Sequelize(process.env.DATABASE_URL, options);
    console.log('Intentando autenticar...');
    await sequelize.authenticate();
    console.log('✅ CONEXIÓN EXITOSA: Base de datos conectada correctamente');

    // Probar una consulta simple
    console.log('Probando consulta simple...');
    const result = await sequelize.query('SELECT version()', { type: Sequelize.QueryTypes.SELECT });
    console.log('Versión de PostgreSQL:', result[0].version);

    await sequelize.close();
    console.log('✅ Conexión cerrada correctamente');

  } catch (error) {
    console.error('❌ ERROR DE CONEXIÓN con Sequelize:', error.message);
    console.log('Detalles del error:');
    console.log('- Nombre:', error.name);
    console.log('- Código:', error.code);
    console.log('- Número de error:', error.errno);
    console.log('- Host:', error.hostname);
    console.log('- Syscall:', error.syscall);
  }

  // 5. Probar conexión directa con pg library
  console.log('\n5. Probando conexión directa con pg library...');
  try {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    await client.connect();
    console.log('✅ CONEXIÓN EXITOSA con pg library');

    const result = await client.query('SELECT version()');
    console.log('Versión de PostgreSQL:', result.rows[0].version);

    await client.end();
    console.log('✅ Conexión cerrada correctamente');

  } catch (pgError) {
    console.error('❌ ERROR DE CONEXIÓN con pg library:', pgError.message);
    console.log('Detalles del error:');
    console.log('- Nombre:', pgError.name);
    console.log('- Código:', pgError.code);
    console.log('- Número de error:', pgError.errno);
    console.log('- Host:', pgError.hostname);
    console.log('- Syscall:', pgError.syscall);

    console.log('\nPosibles soluciones:');
    if (pgError.message.includes('SASL')) {
      console.log('1. El error SASL indica problemas de autenticación con el pooler');
      console.log('2. Verificar que la contraseña sea correcta en el dashboard de Supabase');
      console.log('3. Considerar usar la conexión directa en lugar del pooler');
      console.log('4. Resetear la contraseña de la base de datos en Supabase');
    } else if (pgError.code === 'ENOTFOUND') {
      console.log('1. Verificar que el proyecto de Supabase esté activo (no pausado)');
      console.log('2. Revisar la URL de conexión en el dashboard de Supabase');
      console.log('3. Verificar credenciales de acceso');
    } else if (pgError.code === 'ECONNREFUSED') {
      console.log('1. Verificar que el puerto esté abierto');
      console.log('2. Revisar configuración de firewall');
    } else if (pgError.code === 'ETIMEDOUT') {
      console.log('1. Verificar conectividad a internet');
      console.log('2. Revisar configuración de proxy o VPN');
    }
  }
}

testConnection().catch(console.error);