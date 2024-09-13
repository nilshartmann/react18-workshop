import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./create-query-client.ts";
import { createBrowserRouter, Link, Outlet, RouterProvider } from "react-router-dom";
import CreatePostPage from "./PostEditor.tsx";
import PostListPage from "./PostListPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { element: <PostListPage />, index: true },

      {
        path: "/editor",
        element: <CreatePostPage />
      }
    ]
  }
]);

function Layout() {
  return (
    <div className={"Layout"}>
      <header>
        <div>
          <h2>React Example Blog App</h2>
        </div>
        <div>
          <Link to={"/"}>Home</Link>
          <Link to={"/editor"}>Add Post</Link>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
