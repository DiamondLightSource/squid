import { ListItem } from "@mui/material";
import Link from "next/link";

export default function B18Nav() {
  return (
    <>
      <ListItem>
        <Link href="/about">About</Link>
      </ListItem>
      <ListItem>
        <Link href="/plotting-wasm">plotting wasm</Link>
      </ListItem>
      <ListItem>
        <Link href="/sample-prep">Sample Prep</Link>
      </ListItem>
      <ListItem>
        <Link href="/xraylib">Xraylib</Link>
      </ListItem>
      <ListItem>
        <Link href="/scripting">Scripting</Link>
      </ListItem>
      <ListItem>
        <Link href="/run-scans">run scans</Link>
      </ListItem>
      <ListItem>
        <Link href="/simple-parameters">Simple params</Link>
      </ListItem>
    </>
  );
}
