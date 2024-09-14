import { useState } from "react";

// -----------------------------------------------------------------------------------------------
// TODO: Mache den TagChooser zu einer kontrollierten Komponente:
// -----------------------------------------------------------------------------------------------
//  - Der State (selectedTags) muss als State in die PostEditor-Komponente
//     - Du kannst den useState-Aufruf aus dem TagChooser unverändert in die PostEditor-Komponente
//       übernehmen
//
//  - Du brauchst zwei neue Properties:
//     - selectedTags (Array von string), mit den Tags, die zzt. ausgewählt sind
//        (kontrolliert und übergeben vom PostEditor)
//     - onSelectionChange: eine Funktion, die ein String-Array mit den (neu) ausgewählten
//       Tags entgegennimmt
//
//  - In 'handleSelectTag' musst du nicht mehr den State setzen (den es ja jetzt nicht mehr gibt)
//     sondern die Callback-Funktion onSelectionChange aufrufen
//
//  - Du musst dann den PostEditor anpassen:
//     - Dort muss es einen neuen State geben (den verschobenen Tags-State aus dem TagChooser)
//     - Der PostEditor muss die beiden neuen Properties 'selectedTags' und 'onSelectionChange' übergeben
//     - Wenn im PostEditor auf den 'Clear'-Button gedrückt wird, soll die Liste der Tags geleert werden
//        (leeres Array)

type TagChooserProps = {
  title?: string;
  availableTags: string[];
};

export default function TagChooser({ availableTags, title = "Tags" }: TagChooserProps) {
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
      <h2>{title}</h2>
      <div className={"TagChooser__tags"}>
        {availableTags.map(t => (
          <label key={t}>
            <input
              type="checkbox"
              checked={selectedTags.includes(t)}
              onChange={() => handleSelectTag(t)}
            />
            {t}
          </label>
        ))}
      </div>
    </div>
  );
}
