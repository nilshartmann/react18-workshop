import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./create-query-client.ts";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import PostEditorPage from "./PostEditor.tsx";
import PostListPage from "./PostListPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { element: <PostListPage />, index: true },

      {
        path: "/editor",
        element: <PostEditorPage />
      }
    ]
  }
]);

function Layout() {
  return (
    <div>
      <h1>React Example Blog App</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/editor"}>Add Post</Link>
      <Outlet />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
