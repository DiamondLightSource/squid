import { AppBar, Typography } from "@mui/material";
import { BigMainComponent } from "./components/BigMainComponent";
import styles from "./page.module.css";
import IDE from "./components/IDE";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>

      {/* <BigMainComponent /> */}
      <IDE />
      {/* <MyForm /> */}
    </main>
  );
}
