import React from "react";
import TagChooser from "./TagChooser.tsx";

export default function PostEditor() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const clearDisabled = !title && !body;

  function clear() {
    setTitle("");
    setBody("");
  }

  return (
    <div>
      <h1>Create Post</h1>

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

      <TagChooser availableTags={["React", "Web Development", "JavaScript"]} />

      <button disabled={clearDisabled} onClick={clear}>
        Clear
      </button>
    </div>
  );
}
