import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import TagChooser from "./TagChooser.tsx";

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

export default function PostEditorPage() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const [showPreview, setShowPreview] = useState(false);

  return (
    <div>
      <div className={"PageHeader"}>
        <h1>PostEditor</h1>
        <button className={"small"} onClick={() => setShowPreview(!showPreview)}>
          Show {showPreview ? "Editor" : "Preview"}
        </button>
      </div>

      <div className={"Container"}>
        {showPreview ? (
          <PostPreview title={title} body={body} tags={tags} />
        ) : (
          <PostEditor
            title={title}
            body={body}
            tags={tags}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            onTagsChange={setTags}
          />
        )}
      </div>
    </div>
  );
}

type PostEditorProps = {
  title: string;
  body: string;
  tags: string[];
  onTitleChange(newTitle: string): void;
  onBodyChange(newBody: string): void;
  onTagsChange(newTags: string[]): void;
};

function PostEditor({
  title,
  body,
  tags,
  onTitleChange,
  onBodyChange,
  onTagsChange
}: PostEditorProps) {
  const clearDisabled = !title && !body && tags.length === 0;

  function clear() {
    onTitleChange("");
    onBodyChange("");
    onTagsChange([]);
  }

  return (
    <div>
      <h1>Create Post</h1>

      <label>
        Title
        <input value={title} onChange={e => onTitleChange(e.currentTarget.value)} />
      </label>
      {title.length === 0 && <p className={"error"}>Please enter a title</p>}

      <label>
        Body
        <textarea value={body} onChange={e => onBodyChange(e.currentTarget.value)} />
      </label>
      {body.length === 0 && <p className={"error"}>Please enter a body</p>}

      <TagChooser availableTags={ALL_TAGS} selectedTags={tags} onSelectionChange={onTagsChange} />

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
    </div>
  );
}

type BlogPostProps = {
  title: string;
  body: string;
  tags: string[];
};

// In einer echten Anwendung würde man evtl. eine gemeinsame Komponente
// zum anzeigen eines Posts bauen, die dann auch in PostList verwendet wird
function PostPreview({ title, body, tags }: BlogPostProps) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <div className="Tags">
        {tags?.map(tag => (
          <span key={tag} className={"Tag"}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
