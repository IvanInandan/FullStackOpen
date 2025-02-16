const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./blog-helper");

describe("Blog app", () => {
  // Before every test (global)
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/test/reset"); // Reset database at start of every test
    // Load initial test user(s)
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Ivan Inandan",
        username: "iinandan97",
        password: "password",
      },
    });

    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Learose Miranda",
        username: "lmiranda01",
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

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "iinandan97", "password");
    });

    test("new blog form can be accessed", async ({ page }) => {
      await page.getByRole("button", { name: "Create Blog" }).click();
      await expect(page.getByTestId("create-blog-header")).toBeVisible();
    });

    test("new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "Create Blog" }).click();
      await createBlog(page, "test title", "test author", "test url");
      await expect(page.getByText("test title")).toBeVisible();
    });

    describe("when a note exists in the database", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "Create Blog" }).click();
        await createBlog(page, "test title", "test author", "test url");
      });

      test("blog can be expanded", async ({ page }) => {
        const blogElement = page
          .getByText("test title")
          .locator("..")
          .locator("..");
        await blogElement
          .locator(".info")
          .getByRole("button", { name: "view" })
          .click();
        await expect(
          blogElement.getByRole("button", { name: "like" })
        ).toBeVisible();
      });

      test("blog can be liked", async ({ page }) => {
        // Locate 'test title' blog, locate it's parent because this is where view button is located, click on view button
        await page
          .getByText("test title")
          .locator("..")
          .getByRole("button", { name: "view" })
          .click();

        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("1")).toBeVisible();
      });

      test("blog can be deleted by user who made it", async ({ page }) => {
        await page
          .getByText("test title")
          .locator("..")
          .getByRole("button", { name: "view" })
          .click();

        // Need to set up handler before dialog shows up so playwright knows how to deal with it
        page.on("dialog", async (dialog) => {
          console.log(`Dialog message: ${dialog.message()}`); // Logs the message
          await dialog.accept(); // Clicks "OK" (accepts the confirmation)
        });

        await page.getByRole("button", { name: "delete" }).click();
        await expect(page.getByText("test title")).not.toBeVisible();

        const notif = page.locator(".notif");
        await expect(notif).toHaveText("Blog successfully deleted");
      });

      test("blog deletion is only visible to creator", async ({ page }) => {
        await page.getByRole("button", { name: "Logout" }).click();
        await loginWith(page, "lmiranda01", "password");
        await expect(
          page.getByText("Learose Miranda is logged in")
        ).toBeVisible();
        await page
          .getByText("test title")
          .locator("..")
          .getByRole("button", { name: "view" })
          .click();
        await expect(page.getByText("test url")).toBeVisible();
        await expect(
          page.getByRole("button", { name: "delete" })
        ).not.toBeVisible();
      });
    });

    describe("when multiple blogs exist", () => {
      beforeEach(async ({ page }) => {
        await page.getByRole("button", { name: "Create Blog" }).click();
        await createBlog(page, "zero likes", "test author", "test url");

        await page.getByRole("button", { name: "Create Blog" }).click();
        await createBlog(page, "most likes", "test author", "test url");

        await page.getByRole("button", { name: "Create Blog" }).click();
        await createBlog(page, "least likes", "test author", "test url");

        await page.getByRole("button", { name: "Create Blog" }).click();
        await createBlog(page, "middle likes", "test author", "test url");
      });

      test.only("blogs are ordered based on likes", async ({ page }) => {
        const blogs = await page.locator(".blog").all();
        await expect(blogs[0].getByText("most likes")).toBeVisible();
        await expect(blogs[1].getByText("middle likes")).toBeVisible();
        await expect(blogs[2].getByText("least likes")).toBeVisible();
        await expect(blogs[3].getByText("zero likes")).toBeVisible();
      });
    });
  });
});
