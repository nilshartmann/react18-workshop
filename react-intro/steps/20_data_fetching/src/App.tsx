// Diese Komponente dient im ersten Schritt nur als "Platzhalter".
//
// - In späteren Schritten werden wir hier z.B. den Router hinzufügen
import PostEditor from "./PostEditor.tsx";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./create-query-client.ts";
import PostListPage from "./PostListPage.tsx";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from "react-router-dom";
import { router } from "./create-router.tsx";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
