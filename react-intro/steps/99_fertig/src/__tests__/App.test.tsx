import { beforeEach, test, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import App from "../App.tsx";

// https://www.npmjs.com/package/vitest-fetch-mock
const fetchMocker = createFetchMock(vi);
const mockPosts = [
  { id: "1", title: "One Fetch Mock", body: "Lorem ipsum", date: "2024-09-13T07:29:33.123Z" },
  {
    id: "2",
    title: "Second Post Fetch Mock",
    body: "Some more content",
    date: "2024-08-12T09:13:33.123Z"
  }
];

beforeEach(() => {
  fetchMocker.resetMocks();
});

test("read posts and add new post", async () => {
  // sets globalThis.fetch and globalThis.fetchMock to our mocked version
  fetchMocker.enableMocks();

  // setup user interactions
  const user = userEvent.setup();

  fetchMocker.mockResponseOnce(JSON.stringify(mockPosts));
  render(<App />);

  expect(screen.getByRole("alert")).toBeInTheDocument();

  const articleOne = await screen.findByRole("heading", { name: "One Fetch Mock" });

  expect(articleOne).toBeInTheDocument();
  expect(screen.getByText("Second Post Fetch Mock")).toBeInTheDocument();

  await user.click(screen.getByRole("link", { name: /add post/i }));

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

  const saveRequest = fetchMocker.mock.calls[1][0] as Request;
  const requestBody = await saveRequest?.json();

  // Verify correct body has been SENT to the server
  expect(requestBody).toEqual({ title: "Hello World", body: "Lorem ipsum", tags: [] });

  expect(screen.getByText(/Post saved/i)).toBeInTheDocument();
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
