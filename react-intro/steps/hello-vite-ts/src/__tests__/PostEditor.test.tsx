import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostEditor from "../PostEditor";
import { expect, test, vi } from "vitest";

test("renders correctly", () => {
  const { asFragment } = render(<PostEditor onSavePost={vi.fn()} />);
  expect(asFragment()).toMatchSnapshot();

  screen.logTestingPlaygroundURL();
});

test("add post button callback", async () => {
  const user = userEvent.setup();
  const savePostFn = vi.fn();
  render(<PostEditor onSavePost={savePostFn} />);
  const saveButton = screen.getByRole("button", { name: "Save Post" });
  const titleInput = screen.getByLabelText("Title");
  const bodyInput = screen.getByLabelText("Body");

  // enter form
  await user.type(titleInput, "New Title");
  await user.type(bodyInput, "New Body");
  await user.click(saveButton);

  expect(savePostFn).toHaveBeenCalledWith({ title: "New Title", body: "New Body" });
});

test("save button enablement", async () => {
  const user = userEvent.setup();
  render(<PostEditor onSavePost={vi.fn()} />);

  const titleInput = screen.getByLabelText("Title");
  const bodyInput = screen.getByLabelText("Body");
  const saveButton = screen.getByRole("button", { name: "Save Post" });

  // Save Button should be disabled
  expect(saveButton).toBeDisabled();

  // enter Title...
  await user.type(titleInput, "New Title");

  // should still be disabled
  expect(saveButton).toBeDisabled();

  // enter body
  await user.type(bodyInput, "New Body");

  // ...now the button should be enabled
  expect(saveButton).toBeEnabled();
});

test("clear button", async () => {
  const user = userEvent.setup();
  render(<PostEditor onSavePost={vi.fn()} />);

  const clearButton = screen.getByRole("button", { name: "Clear" });
  const titleInput = screen.getByLabelText("Title");
  const bodyInput = screen.getByLabelText("Body");

  // enter form
  await user.type(titleInput, "New Title");
  await user.type(bodyInput, "New Body");

  expect(titleInput).toHaveValue("New Title");

  await user.click(clearButton);

  expect(titleInput).toHaveValue("");
  expect(bodyInput).toHaveValue("");
});
