import { beforeEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";

// https://www.npmjs.com/package/vitest-fetch-mock
const fetchMocker = createFetchMock(vi);
const mockPosts = [
  { id: "1", title: "One Fetch Mock", body: "Lorem ipsum" },
  { id: "2", title: "Second Post Fetch Mock", body: "Some more content" }
];

beforeEach(() => {
  fetchMocker.resetMocks();
});

it("should render posts read from backend", async () => {
  // sets globalThis.fetch and globalThis.fetchMock to our mocked version
  fetchMocker.enableMocks();

  // setup user interactions
  const user = userEvent.setup();

  fetchMocker.mockResponseOnce(JSON.stringify(mockPosts));
  render(<App />);

  expect(screen.getByRole("alert")).toBeInTheDocument();

  const articleOne = await screen.findByRole("heading", { name: "One Fetch Mock" });
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(articleOne).toBeInTheDocument();
  expect(screen.getByText("Second Post Fetch Mock")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /add/i }));

  const postEditor = getPostEditorModel(user);
  await postEditor.fillTitle("Hello World");
  await postEditor.fillBody("Lorem ipsum");

  // mock save response
  const mockResponse = {
    title: "Hello World",
    body: "Lorem ipsum",
    id: "P9999999"
  };
  fetchMocker.mockResponseOnce(JSON.stringify(mockResponse), { status: 201 });

  await postEditor.clickSave();

  expect(fetchMocker).toHaveBeenCalledTimes(2);

  // Verify correct body has been SENT to the server
  expect(fetchMocker.mock.calls[1][1]?.body).toEqual(
    JSON.stringify({ title: "Hello World", body: "Lorem ipsum", tags: [] })
  );

  // we should be back on the front page with post list again,
  // new blog post should be visible
  await screen.findByRole("heading", {
    name: /Hello World/i
  });
});

function getPostEditorModel(user: UserEvent) {
  expect(screen.getByRole("heading", { name: /create post/i })).toBeInTheDocument();

  return {
    saveButton: screen.getByRole("button", { name: "Save Post" }),
    titleInput: screen.getByLabelText("Title"),
    bodyInput: screen.getByLabelText("Body"),

    async fillTitle(newTitle: string) {
      return user.type(this.titleInput, newTitle);
    },
    async fillBody(newBody: string) {
      return user.type(this.bodyInput, newBody);
    },
    async clickSave() {
      return user.click(this.saveButton);
    }
  };
}
