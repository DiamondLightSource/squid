"use client";
import CodeEditor from "../components/CodeEditor";
import { Grid, ButtonGroup, Button, Container } from "@mui/material";
import EditorTabs from "../components/EditorTabs";
import FileExplorer from "../components/FileExplorer";
import { IDEProvider } from "../components/ideState";

export default function SimpleParamsPage() {
  return (
    <div>
      <h1> Simple Parameters</h1>
      <IDEProvider>
        <div className="ide">
          <Grid container display="flex" direction="column" spacing={2}>
            <Grid container item spacing={2} flex={1}>
              {/* File Explorer */}
              <Grid item xs={3}>
                <FileExplorer />
              </Grid>

              <Grid item xs={9}>
                <Container sx={{ display: "flex", flexDirection: "column" }}>
                  <EditorTabs />
                  <CodeEditor />
                </Container>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </IDEProvider>
    </div>
  );
}
