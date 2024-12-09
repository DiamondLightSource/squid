"use client";
import Editor, { DiffEditor, DiffEditorProps } from "@monaco-editor/react";

import init, { Workspace, type Diagnostic } from "@astral-sh/ruff-wasm-web";
import { ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";

const exampleDocument = `print('hello'); print("world")`;

export default function PythonEditor() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [text, setText] = useState(exampleDocument);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  // Initialize WASM and Workspace
  useEffect(() => {
    async function initialize() {
      await init(); // Initializes WASM module
      const newWorkspace = new Workspace({
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
      setWorkspace(newWorkspace);
    }

    initialize();
  }, []);

  // Handle format
  const handleFormat = () => {
    if (workspace) {
      const formattedText = workspace.format(text);
      setText(formattedText); // Update text with formatted content
    }
  };

  // Handle lint
  const handleLint = () => {
    if (workspace) {
      const lintDiagnostics = workspace.check(text);
      setDiagnostics(lintDiagnostics); // Update diagnostics state
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <ButtonGroup>
        <button onClick={handleFormat}>Format</button>
        <button onClick={handleLint}>Lint</button>
      </ButtonGroup>
      {/* <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "200px" }}
      /> */}
      <div>Errors (if any):</div>
      <ul>
        {diagnostics.map((d) => (
          <li key={d.code}>
            {d.message} (Code: {d.code})
          </li>
        ))}
      </ul>
      <Editor
        height="70vh"
        language="python"
        defaultValue='print("hello world!")'
        value={text}
        onChange={(t) => {
          setText(t ?? "");
          handleLint();
        }}
      />
    </div>
  );
}
