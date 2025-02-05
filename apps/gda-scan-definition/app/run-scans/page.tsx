"use client";
import RunScanForm from "../components/forms/RunScanForm";
import TerminalComponent from "../components/RawTerminal";
import { MyTerminal, RefTerminal } from "../components/XTerm";

export default function RunScanPage() {
  return (
    <div>
      <h1>run scan page</h1>
      <RunScanForm />
      {/* <MyTerminal /> */}
      {/* <RefTerminal /> */}
      {/* <TerminalComponent /> */}
    </div>
  );
}
