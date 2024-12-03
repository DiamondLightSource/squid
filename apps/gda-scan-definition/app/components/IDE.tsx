"use client";
import React from "react";
import FileExplorer from "./FileExplorer";
import Tabs from "./Tabs";
import Editor from "./CodeEditor";
import { FileItem, IDEProvider, useIDEDispatch, useIDEState } from "./ideState";
import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";

const IDE: React.FC = () => {
  return (
    <IDEProvider>
      <div className="ide">
        {/* Main grid container */}
        <Grid
          container
          direction="column"
          spacing={2}
          style={{ height: "100vh" }}
        >
          {/* Horizontal bar for potential buttons */}
          <Grid item>
            <MainButtons />
          </Grid>

          {/* Main layout grid: File Explorer, Tabs, and Editor */}
          <Grid container item spacing={2} flex={1}>
            {/* File Explorer */}
            <Grid item xs={3}>
              <FileExplorer />
            </Grid>

            {/* Tabs and Editor */}
            <Grid item xs={9}>
              <Grid
                container
                direction="column"
                spacing={2}
                style={{ height: "100%" }}
              >
                {/* Tabs */}
                <Grid item>
                  <Tabs />
                </Grid>

                {/* Editor */}
                <Grid item flex={1}>
                  <Editor />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </IDEProvider>
  );
};

export default IDE;

function MainButtons() {
  const { openTabs, activeTab } = useIDEState();
  const dispatch = useIDEDispatch();
  return (
    <ButtonGroup
      sx={{
        width: "100%",
        height: "40px",
        backgroundColor: "#f5f5f5", // Light gray background for the bar
        borderBottom: "1px solid #ddd", // Thin border to define the bar
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Buttons or controls can go here */}
      <Button>Null Button</Button>
      <Button
        onClick={() => {
          const f: FileItem = {
            id: "",
            label: "",
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
            id: "",
            label: "",
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
