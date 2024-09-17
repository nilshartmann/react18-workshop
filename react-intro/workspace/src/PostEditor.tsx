import React, { useState } from "react";
import TagChooser from "./TagChooser.tsx";

// "Guten Morgen!"  |   setTitle
// ""               |   setBody

// export default function PostEditor() {
//
//   const [counter, setCounter] = useState(0);
//
//   // Funcition #1
//   const increaseCounter = () => setCounter(counter+1)
//
//   function increaseCounter_2() {
//     setCounter(counter+1)
//   }
//
//   // return React.createElement("button", increaseCounter );
//
//   return <button onClick={ increaseCounter }>{counter}</button>
//
// }

export default function PostEditor() {

  // rules of hooks
  const [title, setTitle] = useState("Guten Morgen.");
  const [body, setBody] = useState("");

  // setTitle(null)

  //  const [errorMessage, setErrorMessage] = useState("");
  console.log("PostEditor", title);

  const hinweisText = `Sie haben gerade eingetippt: ${title}`

  const errorText = title.length === 0 ? "Bitte Titel eingeben" : "";

  // const titleState = useState("Guten Morgen.");
  // const title = titleState[0];
  // const setTitle = titleState[1];

  function getErrorMessage() {
    return title.length === 0 ? "Kein Titel" : "Alles in Ordnung";
  }


  const style = {
  "borderColor": "red",
    "padding": "2rem"
  }

  // JSX  virtual DOM
  return (
    <div className='Container' style={style}>
      <label>
        Title
        <input type="text" value={title}
          // placeholder={"Bitte geben Sie einen Titel ein"}
               onChange={event => setTitle(event.target.value)}/>
      </label>
      <input type="text" value={body}
             onChange={event => setBody(event.target.value)}/>

      <button onClick={() => {
        setTitle("");
        setBody("");
      }}>Clear </button>
      <p>{hinweisText}</p>
      {getErrorMessage()}
      {!title && <p>Kein Titel</p>}
      {title ? null : <p>Kein Titel</p>}

      <TagChooser
        availableTags={
        ["JavaScript", "TypeScript", "react"]}
        title={"Tags für " + title}
         />

    </div>
  );
}

// const props = {
//   availableTags: ["JavaScript", "TypeScript"],
//   title: "Select tags for your post"
// }
