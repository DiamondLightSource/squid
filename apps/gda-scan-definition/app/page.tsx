import BasicTabs, { CustomTabPanel } from "./components/BasicTabs";
import {
  BasicRichTreeView,
  ExperimentTreeView,
  FilesystemTreeView,
} from "./components/ExperimentTreeView";
import styles from "./page.module.css";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      hello b18 what is an action? an update with a partial to a state of a
      given aspect of the scan each is an atomic action need dynamic routes for
      each tab I think, while the sidebar is fixed
      https://www.npmjs.com/package/react-accessible-treeview
      {/* <ExperimentTreeView />
      <BasicRichTreeView />
      <BasicTabs /> */}
      <FilesystemTreeView />
    </main>
  );
}
