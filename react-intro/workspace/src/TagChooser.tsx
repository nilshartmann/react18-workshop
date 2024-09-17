import { useState } from "react";

type TagChooserProps = Readonly<{
  availableTags: ReadonlyArray<string>;
  title?: string
}>

// function TagChooser_so_nicht(availableTags: string[], title = "Tags") {
//
// }

export default function TagChooser(
  {availableTags, title = "Tags"}: TagChooserProps)
{
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

  availableTags[3] = "Dritter Tag";

  return (
    <div>
      <h2>{title.toUpperCase()}</h2>
      <div className={"TagChooser__tags"}>
        {
          availableTags.map(tag => {
            return <label key={tag}>
              <input type={"checkbox"}
                     checked={selectedTags.includes(tag)}
                     onChange={() => handleSelectTag(tag)}   />
              {tag}</label>
          })
        }

      </div>
    </div>
  );
}
