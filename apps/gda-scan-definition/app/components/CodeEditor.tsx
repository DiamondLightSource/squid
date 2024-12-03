"use client";
import Editor from "@monaco-editor/react";
import React from "react";
import { useIDEState, useIDEDispatch } from "./ideState";
import { Button, ButtonGroup } from "@mui/material";

const CodeEditor: React.FC = () => {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();

  const activeTabData = openTabs.find((tab) => tab.id === activeTab);

  if (!activeTabData) {
    return <div className="editor">No file selected</div>;
  }

  const handleContentChange = (text: string) => {
    dispatch({
      type: "EDIT_TAB_CONTENT",
      payload: { id: activeTabData.id, content: text },
    });
  };

  return (
    <div>
      <ButtonGroup>
        <Button disabled>Save is disabled because autosave is enabled</Button>
      </ButtonGroup>
      {/* <textarea
        value={activeTabData.content}
        onChange={handleContentChange}
        className="editor"
      /> */}
      <Editor
        height="90vh"
        defaultLanguage="html"
        defaultValue="// some comment"
        value={activeTabData.content}
        onChange={(t) => handleContentChange(t || "")}
      />
    </div>
  );
};

export default CodeEditor;
