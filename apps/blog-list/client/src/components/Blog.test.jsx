import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("only title and author are shown at start", async () => {
  const blog = {
    title: "test blog",
    author: "test author",
    likes: "0",
    url: "test url",
    user: {
      id: "67a156b4e6911eb1c8782e6d",
      username: "iinandan97",
      name: "Ivan Inandan",
    },
  };

  const user = {
    id: "67a156b4e6911eb1c8782e6d",
    username: "iinandan97",
    name: "Ivan Inandan",
  };

  const { container } = render(
    <Blog blog={blog} user={user} addLike={vi.fn()} deleteBlog={vi.fn()} />
  );

  expect(screen.getByText("test blog")).toBeVisible();
  expect(screen.getByText("test author")).toBeVisible();

  expect(screen.queryByText("0")).not.toBeInTheDocument();
  expect(screen.queryByText("test url")).not.toBeInTheDocument();

  screen.debug();

  /*
  screen.debug(); // Before showInfo is expanded

  const userEve = userEvent.setup();
  const showInfo = screen.getByText("view");
  await userEve.click(showInfo);

  screen.debug(); // After showInfo is expanded
  */
});
