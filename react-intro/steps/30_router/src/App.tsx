// Diese Komponente dient im ersten Schritt nur als "Platzhalter".
//
// - In späteren Schritten werden wir hier z.B. den Router hinzufügen
import { RouterProvider } from "react-router-dom";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./create-query-client.ts";
import { router } from "./create-router.tsx";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
