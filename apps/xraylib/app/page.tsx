"use client";

import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import { useState } from "react";
import React from "react";
import { allowedElementSymbols } from "./xraylib/allowedElementSymbols";
import { ShowTables } from "./xraylib/components/ShowTables";
import { useElementData } from "./xraylib/useElementData";

export default function Page(): JSX.Element {
  const [selectedElementSymbol, setSelectedElementSymbol] = useState(
    allowedElementSymbols[0]
  );
  const {
    properties,
    xrayLevels,
    transitions,
  } = useElementData(selectedElementSymbol).data;

  console.log(properties);
  console.log(`xray levels: ${xrayLevels}`);
  console.log(transitions);
  return <main>
    <div>
      <h1>XraylibPage</h1>
      <h4>Current element: {selectedElementSymbol}</h4>
      <PeriodicTable
        callback={(element) => setSelectedElementSymbol(element.Symbol)}
      // squareSize={25} margin={0.75}
      />
      <div>
        <ShowTables
          properties={properties}
          absorption={xrayLevels}
          transitions={transitions}
        />
      </div>
    </div>
  </main>
}
