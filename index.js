const puppeteer = require('puppeteer'); 

const URL = 'https://example.com';
const USERS = [
    { username: 'user1@example.com', password: 'password1' },
    { username: 'user2@example.com', password: 'password2' },
];

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1200,800', '--incognito']
    });

    const context = await browser.createBrowserContext();

    for (const user of USERS) {
        const page = await context.newPage();
        const client = await page.target().createCDPSession();
        
        // Clear all browsing data
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
        await client.send('Storage.clearDataForOrigin', {
            origin: '*',
            storageTypes: 'all'
        });

        page.setDefaultTimeout(5000);
        
        await page.setViewport({ width: 1185, height: 800 });
        await page.goto(URL);
        
        await page.locator('::-p-text(Log In)').click();
        await page.waitForNavigation();
        
        await page.locator('#username').fill(user.username);
        await page.locator('::-p-text(Continue)').click();
        await page.waitForNavigation();
        
        await page.locator('#password').fill('Q');
        await page.keyboard.up('q');
        await page.locator('#password').fill(user.password);
        
        await page.locator('::-p-text(Continue)').click();
        await page.waitForNavigation();
        
        try {
            await page.waitForSelector('[data-error-code="custom-script-error-code_invalid_user_password"], #error-element-password, .ulp-input-error-icon', { timeout: 2000 });
            console.log(`Login failed for: ${user.username} - Invalid password`);
        } catch (e) {
            console.log(`Login successful for: ${user.username}`);
        }
        
        await page.close();
    }
    
    await context.close();
    await browser.close();
})().catch(err => {
    console.error("Not possible to login");
    process.exit(1);
});