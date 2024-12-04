"use client";
import React from "react";
import FileExplorer from "./FileExplorer";
import EditorTabs from "./EditorTabs";
import Editor from "./CodeEditor";
import { FileItem, IDEProvider, useIDEDispatch, useIDEState } from "./ideState";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { getParameters } from "../actions/qexafs-actions";
import { ParamsForm } from "./forms/ParamsForm";
import OutputParametersForm from "./forms/OutputForm";
import SampleParametersForm from "./forms/SampleForm";
import { MyForm } from "./forms/AutoFormTest";
import DetectorParametersForm from "./forms/DetectorParametersForm";

const IDE: React.FC = () => {
  // Load existing circles
  const fetchParams = async () => {
    try {
      const response = await getParameters();
      console.log(response);
      if (!response || !response.data) {
        alert("No circles found");
        return;
      }
      const circles: any[] = response.data.parameters;
      if (circles.length === 0) {
        alert("No circles found");
      }
    } catch (error) {
      alert("Error fetching circles");
    }
  };

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
            <ButtonGroup>
              <Button> Test</Button>
            </ButtonGroup>
          </Grid>

          {/* Main layout grid: File Explorer, Tabs, and Editor */}
          <Grid container item spacing={2} flex={1}>
            {/* File Explorer */}
            <Grid item xs={3}>
              <FileExplorer />
            </Grid>

            {/* Tabs and Editor */}
            <Grid item xs={9}>
              <Container sx={{ display: "flex", flexDirection: "column" }}>
                {/* Tabs */}
                <EditorTabs />

                {/* Editor */}
                <Editor />
              </Container>
            </Grid>

            <Grid item xs={12}>
              <ParamsForm />
              <OutputParametersForm />
              <SampleParametersForm />
              {/* <MyForm /> */}
              <DetectorParametersForm />

            </Grid>
          </Grid>
        </Grid>
      </div>
    </IDEProvider>
  );
};

export default IDE;
