"use client";
import Grid from "@mui/material/Grid2";
import TerminalComponent from "./components/Terminal";

export default function TerminalPoc() {
  return <Grid container spacing={2}>
    <Grid size={6}>
      <div style={{ width: "20vw", height: "30vh", padding: "5px" }}>
        <h2>part 1</h2>
        <TerminalComponent />
      </div>
    </Grid>

    <div>
      <p>place for the terminal</p>
    </div>
    
    <Grid size={6} >
      <h2>part 2</h2>
      <TerminalComponent />
    </Grid>


    <Grid size={6}>
      <h2>part 3</h2>
      <TerminalComponent />
    </Grid>


    <Grid size={6}>
      <h2>part 4</h2>
      <TerminalComponent />
    </Grid>
  </Grid>
}
