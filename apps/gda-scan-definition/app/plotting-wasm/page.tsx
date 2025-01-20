"use client";
import "@h5web/app/dist/styles.css";

import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { App } from "@h5web/app";
import { H5WasmProvider } from "@h5web/h5wasm";

interface H5File {
  filename: string;
  buffer: ArrayBuffer;
}

function PlottingWasmPage() {
  const [h5File, setH5File] = useState<H5File>();

  function handleFileInputChange(evt: ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0];
    if (!file) {
      return;
    }

    /* `H5WasmProvider` expects an HDF5 file in the form of an `ArrayBuffer`.
     * The way you get this buffer is up to you. Here, we show a simple file picker
     * and use the FileReader API to process the selected file. */
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setH5File({
        filename: file.name,
        buffer: reader.result as ArrayBuffer,
      });
    });

    reader.readAsArrayBuffer(file);
  }

  if (!h5File) {
    return (
      <input
        aria-label="Pick HDF5 file"
        type="file"
        accept=".h5"
        onChange={handleFileInputChange}
      />
    );
  }

  return (
    <div style={{ height: "100vh" }}>
      <H5WasmProvider {...h5File}>
        <App />
      </H5WasmProvider>
    </div>
  );
}

export default PlottingWasmPage;

