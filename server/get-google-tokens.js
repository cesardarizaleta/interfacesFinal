const { GoogleDriveService } = require('./services/google_drive_service');

async function setupGoogleAuth() {
  const driveService = new GoogleDriveService();

  console.log('=== GOOGLE DRIVE AUTHENTICATION SETUP ===\n');

  // Generate authorization URL
  const authUrl = driveService.generateAuthUrl();
  console.log('1. Abre esta URL en tu navegador:');
  console.log(authUrl);
  console.log('\n2. Acepta los permisos de Google Drive');
  console.log('3. Serás redirigido a una URL como: http://localhost:3001/auth/callback?code=...');
  console.log('4. Copia el código que viene después de "code=" en la URL\n');

  // Wait for user input
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Pega aquí el código de autorización: ', async (code) => {
    try {
      console.log('\nObteniendo tokens...');
      const tokens = await driveService.getTokensFromCode(code);

      console.log('\n=== TOKENS OBTENIDOS ===');
      console.log('Access Token:', tokens.access_token);
      console.log('Refresh Token:', tokens.refresh_token);
      console.log('Expiry Date:', new Date(tokens.expiry_date));

      console.log('\n=== AGREGAR AL .ENV ===');
      console.log('Agrega esta línea a tu archivo .env:');
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);

      console.log('\n¡Listo! Ahora puedes usar Google Drive en tu aplicación.');

    } catch (error) {
      console.error('Error obteniendo tokens:', error.message);
    }

    rl.close();
  });
}

setupGoogleAuth();