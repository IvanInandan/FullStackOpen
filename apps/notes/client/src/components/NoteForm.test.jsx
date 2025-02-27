import { render, screen } from "@testing-library/react";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createNote = vi.fn();

  const { container } = render(<NoteForm createNote={createNote} />);

  const input = container.querySelector("#note-input");
  const sendButton = screen.getByText("Save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");

  console.log(createNote.mock.calls);
});
