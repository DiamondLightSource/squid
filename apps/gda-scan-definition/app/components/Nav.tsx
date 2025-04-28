import { ListItem } from "@mui/material";
import Link from "next/link";
import BasicMenu from "./BasicMenu";

export default function B18Nav() {
  return (
    <>
      <ListItem>
        <Link href="/sample-prep">Sample Prep</Link>
      </ListItem>
      <ListItem>
        <Link href="/qexafs">qexafs</Link>
      </ListItem>
      <ListItem>
        <Link href="/scripting">Scripting</Link>
      </ListItem>
      <ListItem>
        <Link href="/run-scans">Run scans</Link>
      </ListItem>

      <ListItem>
        <Link href="/daq-landing/s10y">s10y</Link>
      </ListItem>
      <BasicMenu />
    </>
  );
}