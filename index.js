const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log("Iniciando el navegador en Render...");
  
  // Abre el navegador compatible con Render
  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.goto('https://haxball.com', { waitUntil: 'networkidle' });

  // Lee el script de tu sala
  const botCode = fs.readFileSync('bot.js', 'utf8');
  const token = process.env.HAXBALL_TOKEN;

  if (!token) {
    console.error("ERROR: No has configurado la variable HAXBALL_TOKEN en Render.");
    process.exit(1);
  }

  // Inyecta el bot en Haxball
  await page.evaluate((token, botCode) => {
    window.HBInit({
      roomName: "¡Mi Sala 24/7 en Render!", // Puedes cambiar el nombre aquí
      maxPlayers: 16,
      public: true,
      token: token
    });
    
    eval(botCode);
  }, token, botCode);

  console.log("¡ÉXITO! El servidor de Haxball ya está corriendo sin errores.");
})();
