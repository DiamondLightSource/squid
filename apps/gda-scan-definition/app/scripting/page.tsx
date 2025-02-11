import { Container } from "@mui/material";
import FileExplorer from "../components/FileExplorer";
import RunScanForm from "../components/forms/RunScanForm";
import IDE from "../components/IDE";
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
