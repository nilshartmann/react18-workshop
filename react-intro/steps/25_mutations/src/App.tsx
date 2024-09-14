// Diese Komponente dient im ersten Schritt nur als "Platzhalter".
//
// - In späteren Schritten werden wir hier z.B. den Router hinzufügen
import PostEditor from "./PostEditor.tsx";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./create-query-client.ts";
import PostListPage from "./PostListPage.tsx";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostListPage />
      <PostEditor />
    </QueryClientProvider>
  );
}
