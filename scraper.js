const puppeteer = require("puppeteer");

const scrapeGFG = async (username) => {
    const url = `https://www.geeksforgeeks.org/user/${username}/`;

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Navigate to the user's GFG profile
        await page.goto(url, { waitUntil: "load", timeout: 0 });

        // Extract data
        const data = await page.evaluate(() => {
            // Fetch Coding Score
            const codingScore = document.querySelector(".scoreCard_head_left--score__oSi_x")?.innerText || "N/A";

            // Fetch Problems Solved
            const problemSolved = document.querySelectorAll(".scoreCard_head_left--score__oSi_x")[1]?.innerText || "0";

            // Fetch Contest Rating
            const contestRating = document.querySelectorAll(".scoreCard_head_left--score__oSi_x")[2]?.innerText || "N/A";

            // Fetch Institute Rank
            const instituteRank = document.querySelector(".educationDetails_head_left_userRankContainer--text__wt81s b")?.innerText || "N/A";

            // Fetch Institute Name
            const institute = document.querySelector(".educationDetails_head_left--text__tgi9I")?.innerText || "N/A";

            // Fetch Languages Used
            const languagesUsed = document.querySelector(".educationDetails_head_right--text__lLOHI")?.innerText || "N/A";

            return {
                codingScore,
                problemSolved,
                contestRating,
                instituteRank,
                institute,
                languagesUsed
            };
        });

        // Close the browser
        await browser.close();

        return data;
    } catch (error) {
        await browser.close();
        throw new Error(`Error scraping GFG: ${error.message}`);
    }
};

module.exports = { scrapeGFG };
