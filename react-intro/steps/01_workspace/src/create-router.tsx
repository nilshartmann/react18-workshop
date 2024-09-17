import { createBrowserRouter } from "react-router-dom";

// todo:
//  Erzeuge eine Router-Konfiguration mit createBrowserRouter:
//    const router = createBrowserRouter([
//      /* ... */
//    ]);
//  - Es soll zwei Routen geben:
//    - / zeigt auf <PostListPage />
//      (Die PostListPage-Komponente zeigt in dieser Version eine Liste von Dummy-Posts an)
//    - /editor zeigt auf <PostEditor />
//  - In der App-Komponenten entfernst du die beiden Komponenten <PostEditor /> und <PostListPage />
//      und trägst dort stattdessen den RouterProvider mit einer Router-Konfiguration ein:
//      <RouterProvider router={router} />
//  - Im Browser kannst Du jetzt "localhost:3000/" und "localhost:3000/editor" öffnen
//
//  - ZUSATZ:
//    - Vervollständige die globale Layout-Komponente unten und binde sie in die Routen-
//      Konfiguration ein
//       - Die Komponente soll zwei <Link>s erzeugen, auf "/" und auf "/editor"
//       - Außerdem muss die Komponente das <Outlet />-Elemente des React-Routers rendern
//          (das wird vom React Router dann durch den eigentlichen Inhalt der jeweils aktiven
//          Route ersetzt)
//       - Die Komponente soll für alle Routen gelten, deswegen musst du in deiner
//         Routen-Konfiguration einen neuen Eintrag für den Root-Pfad "/" anlegen
//         - die beiden bestehenden Routen musst du dann als "children" deines neuen
//           Root-Eintrags hinzufügen
//           (PostListPage dann mit "index: true" kennzeichnen)
//   - ZUSATZ #2:
//     - Kannst du den PostEditor so umbauen, dass nach dem erfolgreichen (!) Speichern
//       eines Blog Posts die PostListe angezeigt wird?
//

export const router = null;

export function Layout() {
  return (
    <div className={"Layout"}>
      <header>
        <div>
          <h2>React Example Blog App</h2>
        </div>
        <div>{/* todo: Link-Komponenten rendern */}</div>
      </header>
      {/** todo: Outlet-Komponente rendern */}
    </div>
  );
}
