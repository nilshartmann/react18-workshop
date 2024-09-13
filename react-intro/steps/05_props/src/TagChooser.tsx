import { useState } from "react";

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
