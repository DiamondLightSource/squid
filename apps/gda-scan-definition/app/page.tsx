import { AppBar, Typography } from "@mui/material";
import {
  BigMainComponent
} from "./components/BigMainComponent";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <AppBar position="static">
        <Typography variant="h6">GDA Scan Definition</Typography>
      </AppBar>

      <BigMainComponent />
    </main>
  );
}
