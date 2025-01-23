from playwright.sync_api import sync_playwright

def scrape_gfg(username):
    url = f"https://www.geeksforgeeks.org/user/{username}/"

    # Launch Playwright browser
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)  # Launch a headless browser
        page = browser.new_page()

        try:
            # Navigate to the user's GFG profile
            page.goto(url, timeout=60000)

            # Scrape data from the page
            coding_score = page.locator(".scoreCard_head_left--score__oSi_x").nth(0).inner_text() or "N/A"
            problems_solved = page.locator(".scoreCard_head_left--score__oSi_x").nth(1).inner_text() or "N/A"
            contest_rating = page.locator(".scoreCard_head_left--score__oSi_x").nth(2).inner_text() or "N/A"

            # Additional details
            institute_rank = page.locator(".educationDetails_head_left_userRankContainer--text__wt81s b").inner_text() or "N/A"
            institute_name = page.locator(".educationDetails_head_left--text__tgi9I").inner_text() or "N/A"
            languages_used = page.locator(".educationDetails_head_right--text__lLOHI").inner_text() or "N/A"

            # Close the browser
            browser.close()

            # Return the scraped data
            return {
                "codingScore": coding_score,
                "problemsSolved": problems_solved,
                "contestRating": contest_rating,
                "instituteRank": institute_rank,
                "institute": institute_name,
                "languagesUsed": languages_used
            }
        except Exception as e:
            browser.close()
            raise Exception(f"Error scraping GFG: {str(e)}")
