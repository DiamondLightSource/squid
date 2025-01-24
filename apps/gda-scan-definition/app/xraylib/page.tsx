"use client";

import { PeriodicTable } from "@diamondlightsource/periodic-table/table";
import { useState } from "react";
import { allowedElementSymbols } from "../schemas/qexafs";
import { useElementData } from "./useElementData";
import { ShowTables } from "./components/ShowTables";

export default function XraylibPage() {
  const [selectedElementSymbol, setSelectedElementSymbol] = useState(
    allowedElementSymbols[0]
  );
  const {
    edgeEnergy,
    fluorescenceYields,
    properties,
    xrayLevels,
    transitions,
  } = useElementData(selectedElementSymbol).data;

  console.log(properties);
  console.log(xrayLevels);
  console.log(transitions);
  return (
    <div>
      <h1>XraylibPage</h1>
      <h4>Current element: {selectedElementSymbol}</h4>
      <h4>Absorption edge energy: {edgeEnergy}</h4>
      <h4>Fluorescence yields: {fluorescenceYields}</h4>
      <PeriodicTable
        callback={(element) => setSelectedElementSymbol(element.Symbol)}
        // squareSize={25} margin={0.75}
      />
      <div>
        <h2>other details</h2>
        <ShowTables
          properties={properties}
          absorption={xrayLevels}
          transitions={transitions}
        />
      </div>
    </div>
  );
}
