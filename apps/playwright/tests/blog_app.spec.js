const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith } = require("./blog-helper");

describe("Blog app", () => {
  // Before every test (global)
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/test/reset"); // Reset database at start of every test
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

  test("Login form is shown at start by default", async ({ page }) => {
    const locator = await page.getByTestId("login"); // Find element with data-testid === 'login'
    await expect(locator).toBeVisible(); // Check if that element is visible
  });

  describe("Login", () => {
    test("Login successful", async ({ page }) => {
      await loginWith(page, "iinandan97", "password"); // Login with correct credentials
      await expect(page.getByText("Ivan Inandan is logged in")).toBeVisible(); // Login message displayed
    });

    test("Login failure", async ({ page }) => {
      await loginWith(page, "iinandan97", "wrongpassword"); // Login with incorrect credentials

      const errorNotif = page.locator(".notif"); // Select notification pop-up
      await expect(errorNotif).toBeVisible(); // Is notification visible
      await expect(errorNotif).toHaveText("invalid username or password"); // Notification contains accurate error message
    });
  });
});
