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
        <Link href="/forms">Forms</Link>
      </ListItem>
      <ListItem>
        <Link href="/xraylib">Xraylib</Link>
      </ListItem>
      <ListItem>
        <Link href="/scripting">Scripting</Link>
      </ListItem>
      <ListItem>
        <Link href="/run-scans">Run scans</Link>
      </ListItem>
      {/* <ListItem>
        <Link href="/simple-parameters">Simple params</Link>
      </ListItem> */}
      <BasicMenu />
    </>
  );
}