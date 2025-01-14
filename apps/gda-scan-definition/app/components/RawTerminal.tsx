"use client"
import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";

const TerminalComponent = () => {
  const terminalRef = useRef(null);

  useEffect(() => {
    const terminal = new Terminal();
    terminal.open(terminalRef.current);
    // Customize further as needed
    return () => {
      terminal.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default TerminalComponent;
