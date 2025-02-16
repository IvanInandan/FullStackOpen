const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForTimeout(500); // Waits 0.5s before advancing
};

const createBlog = async (page, title, author, url) => {
  await page.getByTestId("title").fill(title);
  await page.getByTestId("author").fill(author);
  await page.getByTestId("url").fill(url);
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByText(title).waitFor(); // Waits for blog title to show on page (populated) before advancing
};

export { loginWith, createBlog };
