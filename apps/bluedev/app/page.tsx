import MainLayout from "./components/MainLayout";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      {/* here a button to refresh the environment and  */}
      {/* here a form to make parameters JSON  */}
      {/* here a button to run a plan with those specific params*/}
      {/* one button to retry the previous one */}
      {/* here requests history  - with a timestamp and arguments */}
      {/* here a queue to send plans as soon as environment is refreshed ok */}
      <MainLayout />

    </main>
  );
}
