import IDE from "../components/IDE";
import styles from "../page.module.css";
import PythonEditor from "./components/PythonEditor";

export default function Scripting() {
  return (
    <main className={styles.main}>
      <PythonEditor />
    </main>
  );
}
