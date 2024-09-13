import { useState } from "react";

// todo:
//  - definiere einen TypeScript-Type für die props des TagChoosers mit dem folgenden Inhalt:
//    - title als optionalen String
//    - availableTags als Array von Strings
//  - erweitere die Signatur vom TagChooser um das props-Objekt (oder arbeite mit Destructuring)
//    - verwende dabei den von dir angelegten TagChooserProps Type
//  - verwende den "title" aus den Properties für das h2-Element
//    - wenn kein title übergeben wurde, verwende einen Default-Titel (z.B. "Tags")
//  - implementiere die Liste zum Anzeigen und Auswählen der Tags (s.u.)
//  - Binde die Komponente in deinen PostEditor ein und übergib eine Liste von ausgedachten
//     Tags als String-Liste, z.B. "React", "JavaScript", "Tutorial"

export default function TagChooser() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function handleSelectTag(tag: string) {
    // Wenn der angeklickte Tag schon in der Liste der selektierten Tags vorhanden ist,
    // muss er aus der Liste entfernt werden,
    // wenn er noch nicht vorhanden ist, in die Liste aufgenommen werden.
    const newSelection = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : selectedTags.concat(tag);

    setSelectedTags(newSelection);
  }

  return (
    <div>
      <h2>TODO: title aus Properties einsetzen</h2>
      <div className={"TagChooser__tags"}>
        {/*

        todo: iteriere hier mit der map-Funktion über die "availableTags"-Liste, die per Property an die
              TagChooser-Komponente übergeben wird und erzeuge für jedes Tag eine Checkbox
                availableTags.map(t => ...)

              - Auf oberste Ebene soll ein <label> gerendert werden
                - hier musst das key-Property setzen (z.B. auf den aktuellen Tag)
                - Das label-Element hat zwei Kinder (<label><input ...>TAG_NAME</label>):
                   - 1. Ein input-Feld mit folgenden Properties
                       - 'type="checkbox"'
                       - 'checked': muss true sein, wenn das aktuelle Tag (t) in der Liste der ausgewählten
                         Tags ('selectedTags' vorhanden ist
                       - 'onChange': soll die Funktion 'handleSelectTag' aufrufen mit dem aktuellen Tag (t)
                   - 2. Der Name des aktuellen Tags


        */}
      </div>
    </div>
  );
}
