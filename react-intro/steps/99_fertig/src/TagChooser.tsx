type TagChooserProps = {
  availableTags: string[];
  selectedTags: string[];
  onSelectionChange: (newSelected: string[]) => void;
};

export default function TagChooser({
  availableTags,
  selectedTags,
  onSelectionChange: onTagClick
}: TagChooserProps) {
  function handleSelectTag(tag: string) {
    const newSelection = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : selectedTags.concat(tag);
    onTagClick(newSelection);
  }

  return (
    <div>
      <h2>Tags</h2>
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
