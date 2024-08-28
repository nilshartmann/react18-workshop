import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PostList from "../PostList";
import { expect, it, vi } from "vitest";

const mockPosts = [
  { id: "1", title: "One", body: "Lorem ipsum", date: "2019-08-23T18:25:43.511Z" },
  { id: "2", title: "Second Post", body: "Some more content", date: "2019-09-22T14:12:21.511Z" }
];

it("renders correctly", () => {
  const result = render(<PostList posts={mockPosts} onAddPost={vi.fn()} />);
  expect(result.asFragment()).toMatchSnapshot();
});

it("invokes callback on button click", async () => {
  const user = userEvent.setup();
  const onAddPostFn = vi.fn();

  // Render
  render(<PostList onAddPost={onAddPostFn} posts={mockPosts} />);

  // search the button
  const buttonElement = screen.getByRole("button", { name: "Add Post" });
  await user.click(buttonElement);

  // make sure it has been invoked
  expect(onAddPostFn).toHaveBeenCalled();
});
