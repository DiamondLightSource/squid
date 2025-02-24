import { Container } from "@mui/material";
import RunScanForm from "../components/forms/RunScanForm";
import { IDEProvider } from "../components/ideReducer";
import styles from "../page.module.css";
import PythonEditor from "./components/PythonEditor";

export default function Scripting() {
  return (
    <main className={styles.main}>
      <IDEProvider>
        <Container sx={{ display: "flex", gap: "10px" }}>
          {/* <FileExplorer /> */}
          <PythonEditor />
          <RunScanForm />
        </Container>
      </IDEProvider>
    </main>
  );
}
