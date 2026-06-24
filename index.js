const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Configuración obligatoria para que corra en los servidores de Render
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });
  
  const page = await browser.newPage();
  await page.goto('https://www.haxball.com/headless', { waitUntil: 'networkidle2' });

  // Lee el script de tu bot
  const botCode = fs.readFileSync('bot.js', 'utf8');

  // Obtiene el Token de Haxball desde las variables de Render
  const token = process.env.HAXBALL_TOKEN;

  // Ejecuta la inicialización de la sala e inyecta tu script
  await page.evaluate((token, botCode) => {
    window.HBInit({
      roomName: "¡Mi Sala 24/7 en Render!",
      maxPlayers: 16,
      public: true,
      token: token
    });
    
    // Inyecta el resto de tus funciones
    eval(botCode);
  }, token, botCode);

  console.log("¡El servidor de Haxball está ejecutándose en Render!");
})();
