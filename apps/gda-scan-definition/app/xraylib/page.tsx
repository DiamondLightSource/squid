"use client";

import { useEffect, useState } from "react";
import {
  actionGetAbsorptionEdgeEnergy,
  actionGetFluorescenceYields,
} from "./xraylib-action";
import { allowedElementSymbols } from "../schemas/qexafs";
import { setegid } from "process";
import { PeriodicTable } from "@diamondlightsource/periodic-table/table";

export default function XraylibPage() {
  const [selectedElementSymbol, setSelectedElementSymbol] = useState(
    allowedElementSymbols[0]
  );
  const [edgeEnergy, setEdgeEnergy] = useState(0);
  const [fluorescenceYields, setFluorescenceYields] = useState(0);

  useEffect(() => {
    const fetchEnergy = async () => {
      console.log(`fetching energy for ${selectedElementSymbol}`);
      try {
        const { success, energy } = await actionGetAbsorptionEdgeEnergy({
          elementSymbol: selectedElementSymbol,
        });
        console.log(`response success: ${success}`);
        console.log(`response energy: ${energy}`);
        console.log(`response keys: ${Object.keys(energy)}`);
        // console.log(`response energy: ${energyResponse.data.energy}`);
        // You can use newEnergy here, for example:
        if (energyResponse && energyResponse.data) {
          console.log(energyResponse.data);
          setEdgeEnergy(energyResponse.data.energy);
        } else {
          console.error("No data found");
        }
        const fluorescenceResponse = await actionGetFluorescenceYields({
          element: selectedElementSymbol,
        });

        if (fluorescenceResponse && fluorescenceResponse.data) {
          console.log(fluorescenceResponse.data);
          setEdgeEnergy(fluorescenceResponse.data.yields);
        } else {
          console.error("No data found");
        }
      } catch (e) {
        console.log(`response errors: ${Object.keys(e.validationErrors)}`);
        console.error(e);
      }
    };
    fetchEnergy();
  }, [selectedElementSymbol]);

  return (
    <div>
      <h1>XraylibPage</h1>
      <h4>Current element: {selectedElementSymbol}</h4>
      <h4>Absorption edge energy: {edgeEnergy}</h4>
      <h4>Fluorescence yields: {fluorescenceYields}</h4>
      <PeriodicTable
        callback={(element) => setSelectedElementSymbol(element.Symbol)}
        squareSize={55}
      />
    </div>
  );
}
