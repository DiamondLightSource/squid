"use client";
import init, { Workspace, type Diagnostic } from "@astral-sh/ruff-api";
import { ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

const exampleDocument = `print('hello'); print("world")`;

// todo fix this
await init(); // Initializes WASM module
// These are default settings just to illustrate configuring Ruff
// Settings info: https://docs.astral.sh/ruff/settings
const workspace = new Workspace({
  "line-length": 88,
  "indent-width": 4,
  format: {
    "indent-style": "space",
    "quote-style": "double",
  },
  lint: {
    select: ["E4", "E7", "E9", "F"],
  },
});

// Will contain 1 diagnostic code for E702: Multiple statements on one line
const diagnostics: Diagnostic[] = workspace.check(exampleDocument);

export default function PythonEditor() {
  await init(); // Initializes WASM module
  const [text, setText] = useState(exampleDocument);

  return (
    <div>
      <ButtonGroup>
        <button onClick={() => workspace.format(exampleDocument)}>
          Format
        </button>
        <button onClick={() => workspace.check(exampleDocument)}>Lint</button>
      </ButtonGroup>
      <textarea value={text} onChange={(t) => setText(t)} />
      <div>errors below if any</div>
      <ul>
        {diagnostics.map((d) => (
          <li key={d.code}>{d.message}</li>
        ))}
      </ul>
    </div>
  );
}
