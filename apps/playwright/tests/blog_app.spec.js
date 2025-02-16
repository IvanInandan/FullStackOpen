const { test, describe, expect, beforeEach } = require("@playwright/test");
const {} = require("./blog-helper");

describe("Blog app", () => {
  // Before every test (global)
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset"); // Reset database at start of every test
    // Load initial test user
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Ivan Inandan",
        username: "iinandan97",
        password: "password",
      },
    });

    await page.goto("/"); // Go to baseURL defined in playwright config
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByTestId("login"); // Find element with data-testid === 'login'
    await expect(locator).toBeVisible(); // Check if that element is visible
  });
});
