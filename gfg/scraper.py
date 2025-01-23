from playwright.sync_api import sync_playwright

def scrape_gfg(username):
    url = f"https://www.geeksforgeeks.org/user/{username}/"

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True, 
            args=["--no-sandbox", "--disable-setuid-sandbox"],
        )
        page = browser.new_page()

        try:
            page.goto(url, timeout=60000)

            # Scrape data
            coding_score = page.locator(".scoreCard_head_left--score__oSi_x").nth(0).inner_text() or "N/A"
            problems_solved = page.locator(".scoreCard_head_left--score__oSi_x").nth(1).inner_text() or "N/A"
            contest_rating = page.locator(".scoreCard_head_left--score__oSi_x").nth(2).inner_text() or "N/A"

            browser.close()

            return {
                "codingScore": coding_score,
                "problemsSolved": problems_solved,
                "contestRating": contest_rating,
            }
        except Exception as e:
            browser.close()
            raise Exception(f"Error scraping GFG: {str(e)}")
