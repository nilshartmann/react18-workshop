import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SimplePostEditor from "../SimplePostEditor";
const persons = [
  { firstname: "Klaus", age: 32 },
  { firstname: "Susi", age: 37 }
];

const greet = (name: string) => {
  return "Hello, " + name;
}

test("format persons", () => {
  const greeting = greet("Klaus")
  expect(greeting).toBe("Hello, Klaus");
});

test("renders correctly mit snapshot", () => {

  const { asFragment } = render(<SimplePostEditor/>);
  expect(asFragment()).toMatchSnapshot();

});


test("renders correctly", async () => {
  const user = userEvent.setup();
  render(<SimplePostEditor/>);

  screen.logTestingPlaygroundURL();

//   expect(screen.findByRole("button", {
//     name: /clear/i
// })).toBeInTheDocument();

  expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();

  const titleInput = screen.getByLabelText("Title");
  const bodyInput = screen.getByLabelText("Body");
  await user.type(titleInput, "Hallo Welt");
  expect(titleInput).toHaveValue("Hallo Welt");

  expect(screen.getByRole('button', { name: /clear/i })).toBeEnabled();

  await user.click(screen.getByRole('button', { name: /clear/i }));
  expect(screen.getByRole('button', { name: /clear/i })).toBeDisabled();



});

