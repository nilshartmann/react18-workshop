import React from "react";
import TagChooser from "./TagChooser.tsx";
import ky from "ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

export default function PostEditor() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const queryClient = useQueryClient();
  const savePostMutation = useMutation({
    mutationFn() {
      return ky.post("http://localhost:7000/posts", {
        json: { title, body, tags }
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const handleSave = () => {
    savePostMutation.mutate();
  };

  const clearDisabled = !title && !body && tags.length === 0;
  const saveButtonDisabled = !title || !body || savePostMutation.isPending;

  function clear() {
    setTitle("");
    setBody("");
    setTags([]);
  }

  return (
    <div>
      <h1>Create Post XXX</h1>

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
      <button disabled={saveButtonDisabled} onClick={handleSave}>
        Save Post
      </button>
      {savePostMutation.isSuccess && <p className={"success"}>Post saved.</p>}
      {savePostMutation.isError && <p className={"error"}>{savePostMutation.error.toString()}</p>}
    </div>
  );
}
