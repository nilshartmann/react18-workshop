import React from "react";
import { NewBlogPost } from "./types";

type PostEditorProps = {
  onSavePost(post: NewBlogPost): void;
};

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

export default function PostEditor(props: PostEditorProps) {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const clearDisabled = !title && !body;
  const saveButtonDisabled = !title || !body;

  function clear() {
    setTitle("");
    setBody("");
    setTags([]);
  }

  return (
    <div className="Container">
      <h1>Create Post</h1>

      <label>
        Title
        <input value={title} onChange={e => setTitle(e.currentTarget.value)} />
      </label>
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea value={body} onChange={e => setBody(e.currentTarget.value)} />
      </label>
      {body ? (
        <Message type="info" msg="Body correctly filled"></Message>
      ) : (
        <Message msg="Please enter a body"></Message>
      )}

      <TagChooser tags={ALL_TAGS} selected={tags} onSelectionChange={setTags} />

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
      <button
        disabled={saveButtonDisabled}
        onClick={() => {
          props.onSavePost({
            title,
            body,
            tags
          });
        }}
      >
        Save Post
      </button>
    </div>
  );
}

type MessageProps = {
  msg: string;
  type?: "error" | "info";
};

function Message({ msg, type = "error" }: MessageProps) {
  const style: React.CSSProperties =
    type === "error" ? { color: "red", fontWeight: "bold" } : { color: "green" };

  return <p style={style}>{msg}</p>;
}

type TagChooserProps = {
  tags: string[];
  selected: string[];
  onSelectionChange: (newSelected: string[]) => void;
};
function TagChooser({ tags, selected, onSelectionChange: onTagClick }: TagChooserProps) {
  function handleSelectTag(tag: string) {
    const newSelection = selected.includes(tag)
      ? selected.filter(t => t === tag)
      : [...selected, tag];
    onTagClick(newSelection);
  }

  return (
    <div>
      <h2>Tags</h2>
      {tags.map(t => (
        <label key={t} className="Checkbox">
          <input
            type="checkbox"
            checked={selected.includes(t)}
            onChange={() => handleSelectTag(t)}
          />
          {t}
        </label>
      ))}
    </div>
  );
}
