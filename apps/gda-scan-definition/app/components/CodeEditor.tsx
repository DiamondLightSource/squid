"use client";
import Editor, { DiffEditor, DiffEditorProps } from "@monaco-editor/react";
import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { modifyFileBuffer } from "../actions/file-actions";
import { getComponentForFilename } from "./FilePrefix";
import { FileItem, useIDEDispatch, useIDEState } from "./ideReducer";
import { getParameters } from "../actions/qexafs-actions";

type EditorType = "regular" | "diff" | "none";

const CodeEditor: React.FC = () => {
  const { openTabs, activeTab, fileTree: fileSystem, fileCache } = useIDEState();
  const dispatch = useIDEDispatch();

  const activeTabData = openTabs.find((tab) => tab.id === activeTab);

  const [currentEditorType, setEditorType] = useState<EditorType>("none");
  useEffect(() => {
    (async () => {
      const params = await getParameters();
    })();
  }, [activeTabData]);
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

  const options = {
    renderSideBySide: true,
    highlightModifiedLines: true,
  };
  return (
    <div>
      <ButtonGroup>
        <Button
          onClick={async () => {
            // todo deal with this
            // if (fileRef.label === "Detector_Parameters.xml") {
            //   const response = await modifyFileBuffer({
            //     id: activeTabData.id,
            //     content: activeTabData.content,
            //   });
            //   console.log(response);
            // }
          }}
        >
          Save{" "}
        </Button>
        <Button
          onClick={() => setEditorType("regular")}
          disabled={currentEditorType === "regular"}
        >
          Use regular editor
        </Button>
        <Button
          onClick={() => setEditorType("diff")}
          disabled={currentEditorType === "diff"}
        >
          Use diff editor
        </Button>
        <Button
          onClick={() => setEditorType("none")}
          disabled={currentEditorType === "none"}
        >
          disable editors
        </Button>
      </ButtonGroup>
      {currentEditorType !== "none" && (
        <Box sx={{ minWidth: "60vw" }}>
          {currentEditorType ? (
            <DiffEditor
              width="70vw"
              height="70vh"
              language="javascript"
              original={fileCache[activeTabData.id] || ""}
              modified={activeTabData.content}
              options={options}
            />
          ) : (
            <Editor
              height="70vh"
              defaultLanguage="javascript"
              language="html"
              defaultValue="// some comment"
              value={activeTabData.content}
              onChange={(t) => handleContentChange(t || "")}
            />
          )}
        </Box>
      )}
      <Form />
    </div>
  );
};

export default CodeEditor;
