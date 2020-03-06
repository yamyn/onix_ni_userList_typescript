import * as puppeteer from 'puppeteer';
const url: string = 'http://localhost:3030/v1/users';

/**
 * @export
 * @function
 * @returns {Promise < Buffer >}
 */
export async function makeScreen(): Promise<Buffer> {
    try {
        const browser: puppeteer.Browser = await puppeteer.launch();

        const page: puppeteer.Page = await browser.newPage();

        page.setViewport({
            width: 1920,
            height: 1080,
        });

        await page.goto(url, { waitUntil: 'domcontentloaded' });
        const screen: Buffer = await page.screenshot({
            fullPage: true,
            type: 'png',
        });

        await browser.close();

        return screen;
    } catch (error) {
        throw error;
    }
}
