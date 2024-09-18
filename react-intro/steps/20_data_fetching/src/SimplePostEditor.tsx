import React, { useEffect } from "react";
import TagChooser from "./TagChooser.tsx";

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

// 1. Render Phase
// 2. Commit Phase

let x = 0;

export default function SimplePostEditor() {
	const [title, setTitle] = React.useState("");
	const [body, setBody] = React.useState("");
	const [tags, setTags] = React.useState<string[]>([]);

	const clearDisabled = !title && !body && tags.length === 0;

	function clear() {
		setTitle("");
		setBody("");
		setTags([]);
	}

	function handleTitleChange(t: string) {
		setTitle(t);
	}

	return (
		<div>
			<h1>Create Post, aber simple!</h1>
			{/*<title>...</title>*/}

			<label>
				Title
				<input value={title} onChange={e => handleTitleChange(e.target.value)} />
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
			<button onClick={() => {}}>Save</button>
		</div>
	);
}
