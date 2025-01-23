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
  const [edgeEnergy, setEdgeEnergy] = useState<number>(0);
  const [fluorescenceYields, setFluorescenceYields] = useState<number>(0);

  useEffect(() => {
    const fetchEnergy = async () => {
      console.log(`fetching energy for ${selectedElementSymbol}`);
      try {
        const response = await actionGetAbsorptionEdgeEnergy({
          elementSymbol: selectedElementSymbol,
        });
        if (!response) {
          console.error("No response from actionGetAbsorptionEdgeEnergy");
          return;
        }
        if (!response.data) {
          console.error(
            "No data in response from actionGetAbsorptionEdgeEnergy"
          );
          return;
        }
        const { energy } = response.data;
        setEdgeEnergy(energy);
      } catch (e) {
        console.log(`response errors: ${Object.keys(e.validationErrors)}`);
        console.error(e);
      }

      try {
        const fluorescenceResponse = await actionGetFluorescenceYields({
          element: selectedElementSymbol,
        });
        if (!fluorescenceResponse) {
          console.error("No response from actionGetFluorescenceYields");
          return;
        }
        if (!fluorescenceResponse.data) {
          console.error(
            `No data in response from actionGetFluorescenceYields: ${fluorescenceResponse}`
          );
          return;
        }
        console.log(`fluorescenceResponse: ${fluorescenceResponse}`);
        console.log(`fluorescenceResponse data: ${fluorescenceResponse.data}`);
        const {  yieldValue } = fluorescenceResponse.data;
        setFluorescenceYields(yieldValue);
      } catch (error) {
        console.error(error);
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
        // squareSize={25} margin={0.75}
      />
    </div>
  );
}
