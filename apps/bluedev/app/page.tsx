import MainLayout from "./components/MainLayout";
import styles from "./page.module.css";


export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <MainLayout />

      <h2> recharts testing</h2>

    </main>
  );
}
