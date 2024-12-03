"use client";
import Editor from "@monaco-editor/react";
import React from "react";
import { useIDEState, useIDEDispatch, FileItem } from "./ideState";
import { Button, ButtonGroup } from "@mui/material";
import { getComponentForFilename } from "./FilePrefix";

const CodeEditor: React.FC = () => {
  const { openTabs, activeTab, fileSystem } = useIDEState();
  const dispatch = useIDEDispatch();

  const activeTabData = openTabs.find((tab) => tab.id === activeTab);

  if (!activeTabData) {
    return <div className="editor">No file selected</div>;
  }

  const fileRef: FileItem | undefined = fileSystem.find(
    (file) => file.id === activeTab
  );

  if (!fileRef) {
    return <div className="editor">file not found</div>;
  }

  const Form = getComponentForFilename(fileRef.label);

  const handleContentChange = (text: string) => {
    // todo first do the validation depending on the form type

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
      <Editor
        height="70vh"
        defaultLanguage="html"
        language="html"
        defaultValue="// some comment"
        value={activeTabData.content}
        onChange={(t) => handleContentChange(t || "")}
      />
      <Form />
    </div>
  );
};

export default CodeEditor;
