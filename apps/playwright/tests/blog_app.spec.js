const { test, describe, expect, beforeEach } = require("@playwright/test");
const {} = require("./blog-helper");

describe("Blog app", () => {
  // Before every test (global)
  beforeEach(async ({ page, request }) => {
    await page.goto("/"); // Go to baseURL defined in playwright config
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByTestId("login"); // Find element with data-testid === 'login'
    await expect(locator).toBeVisible(); // Check if that element is visible
  });
});
