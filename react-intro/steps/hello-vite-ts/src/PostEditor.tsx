import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

export default function PostEditorPage() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const savePostMutation = useMutation({
    async mutationFn() {
      return ky.post("http://localhost:7000/posts", {
        json: { title, body, tags }
      });
    }
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const currentTitle = window.document.title;

    window.document.title = `Post: ${title}`;

    return () => (window.document.title = currentTitle);
  }, [title]);

  const handleSave = () => {
    savePostMutation.mutate();
  };

  const saveButtonDisabled = !title || !body || savePostMutation.isPending;

  return (
    <div className={"Container"}>
      <h1>PostEditor</h1>
      <button className={"small"} onClick={() => setShowPreview(!showPreview)}>
        Show {showPreview ? "Editor" : "Preview"}
      </button>

      {showPreview ? (
        <PostPreview title={title} body={body} />
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

      <button disabled={saveButtonDisabled} onClick={handleSave}>
        Save Post
      </button>
      {savePostMutation.isSuccess && <p>Post saved.</p>}
      {savePostMutation.isError && <p>{savePostMutation.error.toString()}</p>}
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

export function PostEditor({
  title,
  body,
  tags,
  onTitleChange,
  onBodyChange,
  onTagsChange
}: PostEditorProps) {
  const clearDisabled = !title && !body && tags.length > 0;

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
      {title ? (
        <Message type="info" msg="Title correctly filled"></Message>
      ) : (
        <Message type="error" msg="Please enter a title"></Message>
      )}

      <label>
        Body
        <textarea value={body} onChange={e => onBodyChange(e.currentTarget.value)} />
      </label>
      {body ? (
        <Message type="info" msg="Body correctly filled"></Message>
      ) : (
        <Message msg="Please enter a body"></Message>
      )}

      <TagChooser availableTags={ALL_TAGS} selectedTags={tags} onSelectionChange={onTagsChange} />

      <button disabled={clearDisabled} onClick={clear}>
        Clear
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
  availableTags: string[];
  selectedTags: string[];
  onSelectionChange: (newSelected: string[]) => void;
};
function TagChooser({
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
      {availableTags.map(t => (
        <label key={t} className="Checkbox">
          <input
            type="checkbox"
            checked={selectedTags.includes(t)}
            onChange={() => handleSelectTag(t)}
          />
          {t}
        </label>
      ))}
    </div>
  );
}

type BlogPostProps = {
  title: string;
  body: string;
};

function PostPreview({ title, body }: BlogPostProps) {
  return (
    <div className={"Container"}>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}
