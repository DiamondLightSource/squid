"use client";
import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { FileItem, useIDEDispatch, useIDEState } from "./ideState";

import { RichTreeView } from "@mui/x-tree-view";

function FileSystemButtons() {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();

  return (
    <ButtonGroup
      sx={{
        // width: "100%",
        // height: "40px",
        backgroundColor: "#f5f5f5", // Light gray background for the bar
        borderBottom: "1px solid #ddd", // Thin border to define the bar
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        onClick={() => {
          const f: FileItem = {
            id: `file-${Date.now()}`,
            label: "newfile",
            type: "file",
            path: "",
          };
          dispatch({ type: "ADD_FILE", payload: f });
        }}
      >
        Add file
      </Button>
      <Button
        onClick={() => {
          const folder: FileItem = {
            id: `folder-${Date.now()}`,
            label: "newfolder",
            type: "folder",
            path: "",
          };
          dispatch({ type: "ADD_FOLDER", payload: folder });
        }}
      >
        Add folder
      </Button>
    </ButtonGroup>
  );
}

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
      <Typography> Explorer</Typography>
      <FileSystemButtons />
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
