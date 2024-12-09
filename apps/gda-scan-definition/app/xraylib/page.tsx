"use client";

import { useEffect, useState } from "react";
import {
  actionGetAbsorptionEdgeEnergy,
  actionGetFluorescenceYields,
} from "./xraylib-action";
import { allowedElements } from "../schemas/qexafs";
import { setegid } from "process";

export default function XraylibPage() {
  const [elementName, setElementName] = useState(allowedElements[0]);
  const [edgeEnergy, setEdgeEnergy] = useState(0);
  const [fluorescenceYields, setFluorescenceYields] = useState(0);

  useEffect(() => {
    const fetchEnergy = async () => {
      const energyResponse = await actionGetAbsorptionEdgeEnergy({
        element: elementName,
      });
      // You can use newEnergy here, for example:
      if (energyResponse && energyResponse.data) {
        console.log(energyResponse.data);
        setEdgeEnergy(energyResponse.data.energy);
      } else {
        console.error("No data found");
      }
      const fluorescenceResponse = await actionGetFluorescenceYields({
        element: elementName,
      });

      if (fluorescenceResponse && fluorescenceResponse.data) {
        console.log(fluorescenceResponse.data);
        setEdgeEnergy(fluorescenceResponse.data.yields);
      } else {
        console.error("No data found");
      }
    };
    fetchEnergy();
  }, [elementName]);
  return (
    <div>
      <h1>XraylibPage</h1>
      <h4>Current element: {elementName}</h4>
      <h4>Absorption edge energy: {edgeEnergy}</h4>
      <h4>Fluorescence yields: {fluorescenceYields}</h4>
    </div>
  );
}
