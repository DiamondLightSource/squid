"use client";
import Editor, { DiffEditor } from "@monaco-editor/react";
import React from "react";
import { useIDEState, useIDEDispatch, FileItem } from "./ideState";
import { Button, ButtonGroup } from "@mui/material";
import { getComponentForFilename } from "./FilePrefix";
import { updateDetectorParameters } from "../actions/qexafs-actions";
import { modifyFileBuffer } from "../actions/filesystem-actions";

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

  const code1 = "// your original code...";
  const code2 = "// a different version...";
  const options = {
    //renderSideBySide: false
  };
  return (
    <div>
      <ButtonGroup>
        <Button onClick={async () => {
          if (fileRef.label === "Detector_Parameters.xml") {
            // todo here need to parse the xml back into the form, alternatively just one way change it and refresh the form
            const response = await modifyFileBuffer({ id: activeTabData.id, content: activeTabData.content });
            console.log(response);
          }
        }}>Save </Button>

      </ButtonGroup>
      {/* <Editor
        height="70vh"
        defaultLanguage="html"
        language="html"
        defaultValue="// some comment"
        value={activeTabData.content}
        onChange={(t) => handleContentChange(t || "")}
      /> */}
      <DiffEditor
        width="70vw"
        height="70vh"
        language="javascript"
        original={fileCache[activeTabData.id] || ""}
        modified={activeTabData.content}
        options={options}
      />
      <Form />
    </div>
  );
};

export default CodeEditor;
