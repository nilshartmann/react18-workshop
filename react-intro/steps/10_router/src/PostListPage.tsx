import { BlogPost } from "./types";
import PostList from "./PostList.tsx";


//   ---------------------------------------------------------------------------------
//   - ÜBUNG: TANSTACK QUERY ZUM LADEN VON DATEN
//   ---------------------------------------------------------------------------------
//
//   ** VORBEREITUNG #1: Starten des Backends **
//
//   - Für diese Übungen muss das "Backend" gestartet sein. Der Backend-Prozess stellt eine
//     einfache REST-API zum lesen und schreiben von Blog-Posts zur Verfügung.
//     - Starte bitte zunächst das Backend:
//         - Wechsel in das 'react-intro/backend'-Verzeichnis
//         - Führe dort "npm install" aus
//         - Führe dort "npm start" aus.
//         - Nun sollte das Backend auf Port 7000 laufen
//         - Du kannst das Backend testen, in dem du "http://localhost:7000/posts" im Browser
//           (oder per curl oder wget im Terminal) aufrufst.
//           Dann sollte eine (JSON-)Liste mit Blog-Post-Objekten zurückkommen.
//
//   ** VORBEREITUNG #2: Einfügen der QueryClientProvider-Komponente **
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
  const mockPosts: BlogPost[] = [
    {
      id: "1",
      title: "One Fetch Mock",
      body: "Lorem ipsum",
      date: "2024-09-13T07:29:33.123Z",
      tags: ["Mock"]
    },
    {
      id: "2",
      title: "Second Post Fetch Mock",
      body: "Some more content",
      date: "2024-08-12T09:13:33.123Z",
      tags: ["Mock", "UI"]
    }
  ];

  return (
    <div>
      <h1>Blog Posts</h1>
      <PostList posts={mockPosts} />
    </div>
  );
}
