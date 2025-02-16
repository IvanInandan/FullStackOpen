const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "log in" }).click();
  await page.getByTestId("username").fill("iinandan");
  await page.getByTestId("password").fill("watashi858");
  await page.getByRole("button", { name: "Submit" }).click();
};

const createNote = async (page, content) => {
  await page.getByRole("button", { name: "New note" }).click();
  await page.getByPlaceholder("write note content here").fill(content);
  await page.getByRole("button", { name: "Save" }).click();
  await page.getByText(content).waitFor(); // Waits for note to be created by scanning until content is displayed on page
};

export { loginWith, createNote };
