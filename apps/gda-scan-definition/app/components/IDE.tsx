"use client";
import {
  Button,
  ButtonGroup,
  Container,
  Grid
} from "@mui/material";
import React from "react";
import { getParameters } from "../actions/qexafs-actions";
import Editor from "./CodeEditor";
import EditorTabs from "./EditorTabs";
import FileExplorer from "./FileExplorer";
import OutputParametersForm from "./forms/OutputForm";
import { ParamsForm } from "./forms/ParamsForm";
import SampleParametersForm from "./forms/SampleForm";
import { IDEProvider } from "./ideState";
import DetectorParametersForm from "./forms/DetectorParametersForm";

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
              {/* <ParamsForm />
              <OutputParametersForm />
              <SampleParametersForm />
              <DetectorParametersForm /> */}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </IDEProvider>
  );
};

export default IDE;
