// Diese Komponente dient im ersten Schritt nur als "Platzhalter".
//
// - In späteren Schritten werden wir hier z.B. den Router hinzufügen
import PostEditor from "./PostEditor.tsx";
import React from "react";

// todo:
//  Erzeuge eine Router-Konfiguration mit createBrowserRouter:
//    const router = createBrowserRouter([
//      /* ... */
//    ]);
//  - Es soll zwei Routen geben:
//    - / zeigt auf <PostListPage />
//      (Die PostListPage-Komponente zeigt in dieser Version eine Liste von Dummy-Posts an)
//    - /editor zeigt auf <PostEditor />
//  - Gib unten in der App-Komponente statt des PostEditors den RouterProvider zurück:
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
//

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Layout() {
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

export default function App() {
  return <PostEditor />;
}
