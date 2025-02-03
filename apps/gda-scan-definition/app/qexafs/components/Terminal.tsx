"use client";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css"; // Import the xterm CSS
import { parseCommand } from "./Commands";

const TerminalComponent = () => {
  const terminalRef = useRef(null); // Ref for the terminal container
  const xtermInstance = useRef<Terminal | null>(null); // Ref for the xterm instance
  const inputBuffer = useRef<string>(''); // Ref to buffer input for intermediate updates

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent execution on the server

    if (!terminalRef.current) return;
    // Create terminal and fit addon instances
    const terminal = new Terminal({
        cursorBlink: true,    // Enable blinking cursor
        rows: 24,             // Set the default number of rows
        cols: 80,             // Set the default number of columns
        theme: {              // Customize the theme
            background: "#1e1e1e",
            foreground: "#ffffff",
        },
    });

    const fitAddon = new FitAddon();

    // Attach the terminal to the ref container
    terminal.loadAddon(fitAddon);

    // Mount xterm to the DOM node
    if (terminalRef.current) {
      terminal.open(terminalRef.current);
      fitAddon.fit(); // Automatically size the terminal to its container

      // Example output
      terminal.writeln("Welcome to xterm.js!");
      terminal.writeln("Type 'help' for assistance.");

      const dataCallback = (data: string): void => {
        console.log(`logging input buffer ${inputBuffer.current}`);
        if (data === '\b') { // On backstage key
          const afterDeletion =inputBuffer.current.substring(0, inputBuffer.current.length - 1);
          inputBuffer.current = (afterDeletion);
        } else if (data === '\r') { // On enter key
          terminal.writeln("\n");
          const r = parseCommand(inputBuffer.current);
          terminal.write(r);
          terminal.writeln("\n");
          inputBuffer.current = "";
        } else {
          console.log(inputBuffer.current, data);
          const newCache = `${inputBuffer.current}${data}`;
          inputBuffer.current = newCache;
          console.log(`new cache: ${newCache}`)
          terminal.write(data); // Echo typed data
        }
      };

      // Add some interaction example
      terminal.onData(dataCallback);
    }

    // Save the terminal instance in ref for cleanup
    xtermInstance.current = terminal;

    // Cleanup on unmount
    return () => {
      terminal.dispose();
    };
  }, []);

  return (
    <div
      ref={terminalRef} // This will hold the terminal DOM element
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
    </div>
  );
};

export default TerminalComponent;
