import { z } from "zod";

// export type BlogPost = {
//   id: string;
//   title: string;
//   body: string;
//   date: string;
//   tags: string[];
//   likes?: number;
// };

export const BlogPostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  date: z.string(),
  tags: z.string().array(),
  likes: z.number().optional()
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

export const GetBlogPostsResponse = BlogPostSchema.array();

// const geparsterBlogPost = BlogPostSchema.parse({});
// geparsterBlogPost

//  UEBUNG: Validierung mit zod
//  ------------------------------------------------------------
//  - SCHRITT 1: Einen zod-Typ definieren
//
//  - Beschreibe mit zod das "BlogPostSchema".
//    - Das Schema soll dem TypeScript-Typen "BlogPost" von oben entsprechen
//
//  - Kommentiere den TypeScript-Typen aus, und verwende den von zod erzeugten TS-Typen:
//    - export type BlogPost = z.infer<typeof BlogPostSchema>;
//
//  - Wenn du den zod-Typen korrekt definiert und exportiert hast, müsste die Anwendung
//     weiterhin fehlerfrei compilieren, da der Original-Typ von oben und der von
//     zod aus deinem Schema abgeleitete Typ identisch sein müssen.
//     Um das zu testen, kannst du im Terminal "npm run build" ausführen
//     Dabei dürfte es keine TS Compile-Fehler geben
//
// - SCHRITT 2: Verwenden des Schema-Objektes zum Validieren der gelesenen Daten
//
//  - Definiere nun zusätzlich einen Zod-Typ für eine *Liste (Array)* von BlogPostSchema Objekten,
//     das der Antwort der Antwort des HTTP GET Requests auf "http://localhost:7000/posts" entspricht.
//     Dieses Schema soll "GetBlogPostsResponse" heißen.
//
//  - Das "GetBlogPostsResponse"-Schema musst du ebenfalls exportieren
//
//  - Verwende GetBlogPostsResponse nun in der PostListPage-Komponente, um die gelesenen Daten zu validieren:
//
//    - Entferne dort in der 'queryFn' bei "ky.get<BlogPost[]>(...)" die Typ-Parameter
//            (=> "ky.get(...)")
//    - Verwende die 'parse'-Methode auf dem GetBlogPostsResponse, um die gelesenen Daten zu validieren
//     - Achtung! Die json()-Methode von ky liefert ein Promise zurück!!
//         - Du musst also mit await auf das Ergebnis warten (dann queryFn als 'async'-Funktion kennzeichnen!)
//         - oder du verwendest 'then()' der Promise API um die gelesenen Daten zu erhalten und
//           validierst sie in der Callback-Funktion, die du an then() übergibst.
//    - Die Anwendung sollte weiterhin keine Compile-Fehler haben und das Laden der Daten in der
//       PostListPage-Komponente sollte funktionieren
//    - Du kannst ungültige Daten simulieren, in dem Du die URL in der PostPageList-Komponente anpasst:
//       http://localhost:7000/posts?fail
//    - Lass dir den Fehler in der Browser-Komponente anzeigen
