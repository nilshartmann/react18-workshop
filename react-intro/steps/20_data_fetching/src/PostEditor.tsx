import React, { useEffect } from "react";
import TagChooser from "./TagChooser.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import { BlogPost } from "./types.ts";
import {useNavigate } from "react-router-dom";

const ALL_TAGS = ["React", "TypeScript", "JavaScript"];

// 1. Render Phase
// 2. Commit Phase

let x = 0;

export default function PostEditor() {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  // Seiteneffekt
  // x++;

  // fetch(...)

  // useEffect(() => {
  //   console.log("Effekt!");
  //   const oldTitle = window.document.title;
  //
  //   window.document.title = "PE " + title; // nicht ok
  //
  //   function clean() {
  //     window.document.title = oldTitle;
  //   }
  //
  //   return clean;
  // }, []);

  // setTimeout( ) ;

  // console.log("..."); // ok

  // const navigate = useNavigate()

  const queryClient = useQueryClient();

  const savePostMutation = useMutation({
    mutationFn() {
      return ky.post<BlogPost>("http://localhost:7000/posts?slow", {
        json: { title: title, body: body, tags: tags }
      })
    },
    onSuccess(data) {

      // queryClient.setQueryData()
      queryClient.invalidateQueries({
        queryKey: ["posts"]
      })

      // ....
    }
  })



  const clearDisabled = !title && !body && tags.length === 0;

  function clear() {
    setTitle("");
    setBody("");
    setTags([]);
  }

  async function handleSave() {
    // try {
      await savePostMutation.mutateAsync();
      // ...
    setTimeout(
      () => navigate("/"),
      5000);
    //   navigate("/posts");
    // } catch (e) {
    //   navigate("/error");
    // }
  }

  function handleTitleChange(t: string) {
    setTitle(t);
    savePostMutation.reset();
  }

  return (
    <div>
      <h1>Create Post</h1>
      {/*<title>...</title>*/}

      {savePostMutation.isPending && <p>Post is saving...</p>}
      {savePostMutation.isSuccess && <p>War erfolgreich!</p>}
      {savePostMutation.isError && <p>Post konnte nicht gespeichert werden</p>}

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
      <button onClick={() => handleSave()}>Save</button>
    </div>
  );
}
