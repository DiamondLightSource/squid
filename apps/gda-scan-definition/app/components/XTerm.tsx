"use client";
import { XTerm } from "react-xtermjs";

export const MyTerminal = () => {
  const onData = (data: any) => {
    console.log(`Received data: ${data}`);
  };

  const onResize = (cols: any, rows: any) => {
    console.log(`Terminal resized to ${cols} columns and ${rows} rows`);
  };

  return (
    <>
    
    <div>not working atm</div>
    <XTerm
      onData={onData}
      onResize={onResize}
      options={{ cursorBlink: true }}
      style={{ width: "100%", height: "100%" }}
    />
    </>
  );
};

import { useXTerm } from "react-xtermjs";

export const RefTerminal = () => {
  const { instance, ref } = useXTerm();
  instance?.writeln("Hello from react-xtermjs!");
  instance?.onData((data) => instance?.write(data));

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};
