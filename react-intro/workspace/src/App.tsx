// Diese Komponente dient im ersten Schritt nur als "Platzhalter".
//
// - In späteren Schritten werden wir hier z.B. den Router hinzufügen
import PostEditor from "./PostEditor.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./create-query-client.ts";
import PostListPage from "./PostListPage.tsx";
import {useState} from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



export default function App() {

  return <QueryClientProvider client={queryClient}>
    <Wrapper />
    <PostEditor />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>;
}

function Wrapper() {
  const [open, setIsOpen] = useState(true);

  return <div>
    <button onClick={() => setIsOpen(!open)}>
      {open ? "Close" : "Open"}
    </button>
    {open && <div className={"Flex"}> <PostListPage />
      <PostListPage /></div>}

  </div>
}
