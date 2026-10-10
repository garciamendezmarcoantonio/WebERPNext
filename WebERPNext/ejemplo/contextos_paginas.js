const {chromium} = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });

    const googleContext = await browser.newContext();
    const googlePage = await googleContext.newPage();
    await googlePage.goto('https://www.google.com');
    await googlePage.waitForTimeout(5000);
    console.log('Google page loaded');

    const wikipediaContext = await browser.newContext();
    const wikipediaPage = await wikipediaContext.newPage();
    await wikipediaPage.goto('https://www.wikipedia.org');
    await wikipediaPage.waitForTimeout(5000);
    console.log('Wikipedia page loaded');
    await browser.close();
})();