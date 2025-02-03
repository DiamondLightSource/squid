import Grid from "@mui/material/Grid2";
import TerminalComponent from "./components/Terminal";


export default function QeafsScanPage() {
  return <Grid container spacing={2}>
    <Grid size={8} >
      <div style={{ width: "20vw", height: "30vh", padding: "5px" }}>
        <h2>part 1</h2>
        <TerminalComponent />
      </div>
    </Grid>


    <Grid size={4} >
      <h2>part 2</h2>
      <TerminalComponent />
    </Grid>


    <Grid size={9}>
      <h2>part 3</h2>
      <TerminalComponent />
    </Grid>


    <Grid size={3}>
      <h2>part 4</h2>
      <TerminalComponent />
    </Grid>
  </Grid>
}
