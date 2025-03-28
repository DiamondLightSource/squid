import IDE from "./components/IDE";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <IDE />
    </main>
  );
}
