import { LoginPanel } from "./components/LoginPanel";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <LoginPanel />
    </main>
  );
}
