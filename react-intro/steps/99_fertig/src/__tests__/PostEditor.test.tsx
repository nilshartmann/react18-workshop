import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreatePostPage from "../PostEditor";
import { expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

type WrapperProps = { children: ReactNode };
function Wrapper({ children }: WrapperProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        retry: false,
        refetchOnMount: false,
        refetchOnReconnect: false
      }
    }
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

test("renders correctly", () => {
  const { asFragment } = render(<CreatePostPage />, { wrapper: Wrapper });
  expect(asFragment()).toMatchSnapshot();

  screen.logTestingPlaygroundURL();
});

test("save button enablement", async () => {
  const user = userEvent.setup();
  render(<CreatePostPage />, { wrapper: Wrapper });

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
