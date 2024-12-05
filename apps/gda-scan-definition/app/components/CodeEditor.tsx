"use client";
import Editor from "@monaco-editor/react";
import React from "react";
import { useIDEState, useIDEDispatch, FileItem } from "./ideState";
import { Button, ButtonGroup } from "@mui/material";
import { getComponentForFilename } from "./FilePrefix";
import { updateDetectorParameters } from "../actions/qexafs-actions";

const CodeEditor: React.FC = () => {
  const { openTabs, activeTab, fileSystem, fileCache } = useIDEState();
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

  const handleContentChange = async (text: string) => {

    // parse string into valid xml
    // parse xml into valid json
    // compare json with the chosen schema
    // maybe skip the editor for now  and just use the form
    if (fileRef.label === "Detector_Parameters.xml") {
      // await updateDetectorParameters({ content: text });
    }
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
