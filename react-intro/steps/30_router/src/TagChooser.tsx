type TagChooserProps = {
  title?: string;
  availableTags: string[];
  selectedTags: string[];
  onSelectionChange: (newSelected: string[]) => void;
};

export default function TagChooser({
  title,
  availableTags,
  selectedTags,
  onSelectionChange
}: TagChooserProps) {
  function handleSelectTag(tag: string) {
    const newSelection = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : selectedTags.concat(tag);

    onSelectionChange(newSelection);
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
