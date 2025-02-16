const { test, describe, expect, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./notes-helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Ivan Inandan",
        username: "iinandan",
        password: "watashi858",
      },
    });
    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
  });

  test("successful login leads to main dashboard", async ({ page }) => {
    await loginWith(page, "iinandan", "watashi858");
    await expect(page.getByText("Ivan Inandan logged in")).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "iinandan", "watashi858");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "Test note created via playwright");
      await expect(
        page.getByText("Test note created via playwright")
      ).toBeVisible();
    });

    describe("and a note exists", () => {
      beforeEach(async ({ page }) => {
        await createNote(page, "first note");
        await createNote(page, "second note");
        await createNote(page, "third note");
      });

      test("one of those can be made nonimportant", async ({ page }) => {
        // Returns <span> element that contains the text
        const otherNoteText = await page.getByText("second note");

        // Stores the parent element of the span (ie, the whole note div)
        const otherNoteElement = await otherNoteText.locator("..");

        // Finds the button within specific note div
        await otherNoteElement
          .getByRole("button", { name: "make not important" })
          .click();
        await expect(
          otherNoteElement.getByText("make important")
        ).toBeVisible();
      });
    });
  });

  test("login fails with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "log in" }).click();
    await page.getByTestId("username").fill("iinandan");
    await page.getByTestId("password").fill("watashi857");
    await page.getByRole("button", { name: "Submit" }).click();

    const errorDiv = await page.locator(".error");
    await expect(errorDiv).toContainText("wrong credentials");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");

    await expect(page.getByText("Ivan Inandan logged in")).not.toBeVisible(); // Login message is not displayed
  });
});
