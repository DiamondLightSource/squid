import React from "react";
import styles from "../page.module.css";
import { AppBar, Typography } from "@mui/material";
import About from "../about/page";
import IDE from "../components/IDE";

export default function Scripting() {
  return (
    <main className={styles.main}>
      <AppBar position="static">
        <Typography variant="h6">GDA Scan Definition</Typography>
      </AppBar>

      {/* <BigMainComponent /> */}
      <IDE />
    </main>
  );
}

