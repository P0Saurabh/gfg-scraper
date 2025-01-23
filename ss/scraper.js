const puppeteer = require("puppeteer-core");
const chromium = require("chrome-aws-lambda");

const scrapeGFG = async (username) => {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    try {
        const url = `https://www.geeksforgeeks.org/user/${username}/`;
        await page.goto(url, { waitUntil: "load", timeout: 0 });

        const data = await page.evaluate(() => {
            const codingScore = document.querySelector(".scoreCard_head_left--score__oSi_x")?.innerText || "N/A";
            const problemSolved = document.querySelectorAll(".scoreCard_head_left--score__oSi_x")[1]?.innerText || "0";
            const contestRating = document.querySelectorAll(".scoreCard_head_left--score__oSi_x")[2]?.innerText || "N/A";
            const instituteRank = document.querySelector(".educationDetails_head_left_userRankContainer--text__wt81s b")?.innerText || "N/A";
            const institute = document.querySelector(".educationDetails_head_left--text__tgi9I")?.innerText || "N/A";
            const languagesUsed = document.querySelector(".educationDetails_head_right--text__lLOHI")?.innerText || "N/A";

            return { codingScore, problemSolved, contestRating, instituteRank, institute, languagesUsed };
        });

        await browser.close();
        return data;
    } catch (error) {
        await browser.close();
        throw new Error(`Error scraping GFG: ${error.message}`);
    }
};

module.exports = { scrapeGFG };
