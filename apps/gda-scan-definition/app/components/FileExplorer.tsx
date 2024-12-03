"use client";
import React from "react";
import { useIDEState, useIDEDispatch, FileItem } from "./ideState";
import { RichTreeView } from "@mui/x-tree-view";

const FileExplorer: React.FC = () => {
  const { fileSystem, selectedFile } = useIDEState();
  const dispatch = useIDEDispatch();

  const handleFileClick = (file: FileItem) => {
    dispatch({ type: "SELECT_FILE", payload: file.id });
    if (file.type === "file") {
      dispatch({ type: "OPEN_TAB", payload: file });
    }
  };

  return (
    <div className="file-explorer">
      {fileSystem.map((file) => (
        <div
          key={file.id}
          className={`file-item ${selectedFile === file.id ? "selected" : ""}`}
          onClick={() => handleFileClick(file)}
        >
          {file.label}
        </div>
      ))}
      <RichTreeView
        items={fileSystem}
        onItemSelectionToggle={(event, itemId) => {
          const item = fileSystem.find((item) => item.id === itemId);
          if (item) {
            handleFileClick(item);
          }
        }}
        isItemEditable
        experimentalFeatures={{ labelEditing: true }}
      />
    </div>
  );
};

export default FileExplorer;
