const {chromium} = require('playwright');
const path = require('path');

async function buscarEnGoogle(textoABuscar) {
  // 1. Usamos un perfil persistente para simular un usuario real y evitar bloqueos anti-bot
  const userDataDir = path.join(process.cwd(), '.playwright-user-data');
  
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    // Argumentos esenciales para que Google no te catalogue como un robot sin JavaScript
    args: [
      '--disable-blink-features=AutomationControlled', // Oculta que es un navegador automatizado
      '--use-fake-ui-for-media-stream'
    ]
  });

  const page = context.pages()[0] || await context.newPage();
    // Evitamos enviar la propiedad webdriver que delata a los bots
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    await page.goto('https://www.google.com');
    // Localizamos con el selector infalible de la respuesta anterior
    const campoBusqueda = page.locator('textarea[name="q"]');
    await campoBusqueda.fill(textoABuscar);
    // Esperas y simulación humana al presionar Enter
    await campoBusqueda.press('Enter');
    // Esperamos específicamente a que los resultados ('h3') sean visibles
    await page.waitForSelector('h3', { state: 'visible', timeout: 10000 });
    // Hacemos clic en el primer resultado
    await page.click('text=Instalación');
    await page.click('text=Node.js'); 
}
buscarEnGoogle('Documentacion de Playwright');