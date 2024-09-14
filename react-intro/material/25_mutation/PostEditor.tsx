import React from "react";
import TagChooser from "./TagChooser.tsx";
import ky from "ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

//   ---------------------------------------------------------------------------------
//   - ÜBUNG: TANSTACK QUERY ZUM LADEN VON DATEN
//   ---------------------------------------------------------------------------------
//
//   - Verwende 'useMutation' von TanStack Query, um den neuen Blog Post auf dem
//     Server zu speichern
//
//   - Füge einen neuen Button hinzu ("Save")
//   - (optional) Der Button soll disabled sein, solange title und body leer sind (leere Tags sind erlaubt)
//   - Verwende 'useMutation' um eine Mutation zu erzeugen, mit der der Blog-Post gespeichert werden kann
//     - Als Optionen musst du nur die mutationFn angegebn
//       - diese soll einen POST Request auf http://localhost:7000/posts machen
//       - Dazu kannst du die 'post'-Methode von 'ky' verwenden
//       - als 'json'-Body musst du ein Objekt übergeben, dass aus 'title', 'body', 'tags' besteht
//         (also aus dem Inhalt unseres Formulars)
//   - Führe die Mutation mit 'mutate' aus, wenn auf den Save-Button geklickt wird
//   - Wenn es beim Speichern einen Fehler gab, ('error') war, gib einen allgemeine Fehlermeldung aus
//       (Du kannst einen Fehler simulieren, in dem du einen Titel speicherst, der kürzer als fünf Zeichen
//        lang ist)
//   - Während die Mutation läuft, kannst du den Save-Button disablen
//      - Zum Simulieren eines langsamen Server-Requests kannst du die URL http://localhost:7000/posts?slow verwenden
//   - Wenn das Speichern erfolgreich ('success') war, gib einen Hinweis für den Benutzer aus
//   - Wenn das Speichern erfolgreich war, sorge dafür, dass die PostListe automatisch aktualisiert wird:
//     - hole dir mit 'useQueryClient' das globale TanStack Query QueryClient-Objekt
//     - füge in der Mutation-Konfiguration die 'onSuccess'-Methode hinzu
//       - in dieser Methode musst du mit 'queryClient.invalidateQueries' den Cache invalidieren:
//         - gib dazu bei 'invalidateQueries' ein Objekt mit dem Eintrag 'queryKey' an, das
//           den Query-Key aus deinem Query in der PostListPage enthält

export default function PostEditor() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const clearDisabled = !title && !body && tags.length === 0;

  function clear() {
    setTitle("");
    setBody("");
    setTags([]);
  }

  return (
    <div>
      <h1>Create Post</h1>

      <label>
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      {title.length === 0 && <p className={"error"}>Please enter a title</p>}

      <label>
        Body
        <textarea value={body} onChange={e => setBody(e.target.value)} />
      </label>
      {body.length === 0 && <p className={"error"}>Please enter a body</p>}

      <TagChooser availableTags={ALL_TAGS} selectedTags={tags} onSelectionChange={setTags} />

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
    </div>
  );
}
