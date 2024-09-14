import { BlogPost } from "./types";
import { useQuery } from "@tanstack/react-query";
import ky from "ky";
import LoadingIndicator from "./LoadingIndicator.tsx";
import PostList from "./PostList.tsx";
import { useState } from "react";

//   ---------------------------------------------------------------------------------
//   - ÜBUNG: TANSTACK QUERY ZUM LADEN VON DATEN
//   ---------------------------------------------------------------------------------
//
//   ** VORBEREITUNG: **
//
//    - Um mit TanStack Query Queries und Mutations auszuführen, muss deine Anwendung einen "queryClient"
//      bereitstellen. Das erfolgt mit der QueryClientProvider-Komponenten.
//      - Diese Komponente bitte in der App.tsx hinzufügen. Das 'queryClient'-Objekt ist bereits fertig konfiguriert
//        in dem Modul 'create-query-client'.
//      - Erweitere bitte deine App-Komponente um den QueryClientProvider:
//          import { QueryClientProvider } from "@tanstack/react-query";
//          import { queryClient } from "./create-query-client.ts";
//          // ...
//          export default function App() {
//            return (
//              <QueryClientProvider client={queryClient}>
//                <RouterProvider router={router} />
//              </QueryClientProvider>
//            );
//          }
//
//  ** SCHRITTE: **
//
//  - Verwende 'useQuery' von TanStack Query, um die Blog Posts vom Server zu lesen
//  - Du musst einen 'queryKey' angeben. Das kann z.B. ["posts"] sein.
//     - In einer realistischen Anwendung würde der Query-Key ggf. weitere Parameter enhalten,
//       z.B. eine Such-Reihenfolge
//  - Du musst die queryFn implementieren.
//     - Du kannst die ky-Bibliothek verwenden, um den Request zu machen (https://github.com/sindresorhus/ky?tab=readme-ov-file#usage)
//     - Der Request muss ein GET Request auf die URL http://localhost:7000/posts sein
//     - Der TypeScript-Typ für das Ergebnis vom Server ist "BlogPost[]".
//         - Den Typen kannst Du aus 'types.ts' importieren
//     - Lese mit '.json()' das Ergebnis und verwende es als Rückgabe-Wert für die 'queryFn'
//
//  - Prüfe in der Komponente:
//     1. Sind die Daten noch ausstehend ("pending"), dann zeig' eine Warte-Meldung an. Du kannst dazu die Komponente
//          LoadingIndicator verwenden, wenn du möchtest.
//          Um einen langsamen Request zu simulieren, so dass du die Warte-Meldung auch siehst, kannst Du "?slow" an die URL hängen:
//            http://localhost:7000/posts?slow
//     2. Gab es einen Fehler ("error")? Dann zeige eine einfache Fehlermeldung an.
//     3. Wenn der Query erfolgreich war ("success"), übergib die geladenen Blog-Posts an die PostList-Komponente
//          (die 'mockPosts' kannst du aus dem Code entfernen)
//
//  - OPTIONAL, NUR WENN ZEIT IST:
//    - Implementiere einen Button zum Sortieren der Liste:
//       - Wenn auf den Button geklickt wird, soll der Server die Liste nach Likes sortieren
//       - Dazu musst den Search-Parameter "orderBy=likes" hinzufügen: http://localhost:7000/posts?orderBy=likes
//       - Wenn nicht nach Likes sortiert wird, verwende die Default-Sortierung ohne Search-Parameter http://localhost:7000/posts
//       - Mit dem Button soll es möglich sein, zwischen den beiden Sortierungen ("Standard", "Likes") zu wechseln
//       - Achtung! Du musst auch den queryKey anpassen
//       - Als Alternative zum Button kannst du auch einen Search-Parameter in der URL des Frontends setzen bzw. entfernen
//          - welche Vorteile gegenüber dem State hätte das?
//          - Wenn du das ausprobieren willst, verwende 'useSearchParams', um die Search-Parameter zu lesen und zu ändern
//            siehe: https://reactrouter.com/en/main/hooks/use-search-params#usesearchparams

export default function PostListPage() {
  // Zusatzaufgabe: Sortieren nach Likes
  const [orderByLikes, setOrderByLikes] = useState(false);

  // Zustatzaufgabe: Verwenden der Search Parameter in der URL des Frontends,
  //  um zu "speichern", ob nach Likes sortiert werden soll oder nicht.
  // const [searchParams, setSearchParams] = useSearchParams();
  // const orderByLikes = Boolean(searchParams.get("order_by"));
  // const setOrderByLikes = (newOrderByLikes: boolean) => {
  //   if (newOrderByLikes) {
  //     setSearchParams({"order_by": "likes"});
  //   } else {
  //     setSearchParams();
  //   }
  // }

  const postListQuery = useQuery({
    queryKey: ["posts", orderByLikes],
    // ohne Sortieren nach Likes:
    // queryKey: ["posts"],
    queryFn() {
      // URL ohne Sortieren der Likes: http://localhost:7000/posts
      return ky
        .get<BlogPost[]>(`http://localhost:7000/posts${orderByLikes ? "?orderBy=likes" : ""}`)
        .json();
    }
  });

  if (postListQuery.isPending) {
    return <LoadingIndicator>Posts loading...</LoadingIndicator>;
  }

  if (postListQuery.isError) {
    return <h1>Loading failed 😢</h1>;
  }

  return (
    <div>
      <div className={"PageHeader"}>
        <h1>Blog Posts</h1>
        {/* ZUSATZ AUFGABE: Sortieren nach Likes */}
        <button className={"small"} onClick={() => setOrderByLikes(!orderByLikes)}>
          {orderByLikes ? "Newest first" : "Order by Likes"}
        </button>
      </div>
      <PostList posts={postListQuery.data} />
    </div>
  );
}
