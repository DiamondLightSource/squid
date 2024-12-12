"use client";
import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { FileItem, useIDEDispatch, useIDEState } from "./oldIdeState";

import { RichTreeView } from "@mui/x-tree-view";
import { getFiles } from "../actions/filesystem-actions";
import { selectFileWithFetch } from "../clients/selectors";

function FileSystemButtons() {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();

  const fetchItems = async () => {
    try {
      const response = await getFiles();
      console.log(response);
      if (!response || !response.data) {
        alert("No items found");
        return;
      }
      // NOTE: this slightly odd parsing needs to be to work with the server response
      const items: any[] = await response.data.files;
      console.log(` response: ${JSON.stringify(response)}`);
      console.log(`items: ${items} with length: ${items.length}`);
      if (items == undefined || items.length === 0) {
        alert("No items found");
        return;
      }
      console.log(`items are correct ${items.length}`);
      items.forEach(async (item) => {
        dispatch({ type: "ADD_FILE", payload: item });
        await selectFileWithFetch(dispatch, item.id);
      });
    } catch (error) {
      alert(`Error fetching or parsing items ${error}`);
    }
  };

  return (
    <ButtonGroup
      sx={{
        width: "100%",
        // height: "40px",
        backgroundColor: "#f5f5f5", // Light gray background for the bar
        borderBottom: "1px solid #ddd", // Thin border to define the bar
        padding: "10px",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        onClick={async () => {
          await fetchItems();
        }}
        sx={{ margin: "10px", padding: "10px" }}
      >
        Refresh
      </Button>
      {/* <Button
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
      </Button> */}
    </ButtonGroup>
  );
}

type FileExplorerProps = {
  basePath: string;
};

function FileExplorer({ basePath }: FileExplorerProps) {
  const { fileSystem, selectedFile } = useIDEState();
  const dispatch = useIDEDispatch();
  const handleFileClick = (file: FileItem) => {
    dispatch({ type: "SELECT_FILE", payload: file.id });
    if (file.type === "file") {
      dispatch({ type: "OPEN_TAB", payload: file });
    }
  };
  console.log(`fileSystem: ${fileSystem} with length: ${fileSystem.length}`);

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
        isItemEditable={false}
        experimentalFeatures={{ labelEditing: true }}
      />
    </div>
  );
}

export default FileExplorer;
