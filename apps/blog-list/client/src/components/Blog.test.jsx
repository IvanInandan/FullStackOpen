import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("blog component", () => {
  let blog;
  let user;
  let container;
  let likeHandler;

  beforeEach(() => {
    blog = {
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

    user = {
      id: "67a156b4e6911eb1c8782e6d",
      username: "iinandan97",
      name: "Ivan Inandan",
    };

    likeHandler = vi.fn();

    container = render(
      <Blog
        blog={blog}
        user={user}
        addLike={likeHandler}
        deleteBlog={vi.fn()}
      />
    ).container;
  });

  test("only title and author are shown at start", async () => {
    expect(screen.getByText("test blog")).toBeVisible();
    expect(screen.getByText("test author")).toBeVisible();

    expect(screen.queryByText("0")).not.toBeInTheDocument();
    expect(screen.queryByText("test url")).not.toBeInTheDocument();
  });

  test("after view button is pressed, url/likes/user are shown", async () => {
    const userEve = userEvent.setup();
    const showInfo = container.querySelector(".toggleVis");
    await userEve.click(showInfo);

    expect(screen.getByText("0")).toBeVisible();
    expect(screen.getByText("test url")).toBeVisible();
    expect(screen.getByText("Ivan Inandan")).toBeVisible();
  });

  test("after like button is pressed, event handler function is called twice", async () => {
    const userEve = userEvent.setup();
    const showInfo = container.querySelector(".toggleVis");
    await userEve.click(showInfo);

    const likeBlog = container.querySelector(".likeBlog");
    await userEve.click(likeBlog);
    await userEve.click(likeBlog);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
