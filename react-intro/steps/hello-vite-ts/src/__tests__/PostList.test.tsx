import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PostList from "../PostList";
import { expect, it } from "vitest";

const mockPosts = [
  {
    id: "1",
    title: "One",
    body: "Lorem ipsum",
    date: "2019-08-23T18:25:43.511Z",
    tags: ["Dummy", "Content"]
  },
  {
    id: "2",
    title: "Second Post",
    body: "Some more content",
    date: "2019-09-22T14:12:21.511Z",
    tags: []
  }
];

it("renders correctly", () => {
  const result = render(<PostList posts={mockPosts} />);
  expect(result.asFragment()).toMatchSnapshot();
});
