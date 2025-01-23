const puppeteer = require("puppeteer");

const scrapeGFG = async (username) => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: process.env.CHROME_PATH || puppeteer.executablePath(), // Render's Chrome path
    });

    const page = await browser.newPage();
    try {
        const url = `https://www.geeksforgeeks.org/user/${username}/`;
        await page.goto(url, { waitUntil: "load", timeout: 0 });

        const data = await page.evaluate(() => {
            const codingScore = document.querySelector(".scoreCard_head_left--score__oSi_x")?.innerText || "N/A";
            return { codingScore };
        });

        await browser.close();
        return data;
    } catch (error) {
        await browser.close();
        throw new Error(`Error scraping GFG: ${error.message}`);
    }
};

module.exports = { scrapeGFG };
