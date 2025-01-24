"use client";
import {
  AbsorptionEdgeResponseType,
  ElementPropertiesResponseType,
  EmissionDataResponseType,
} from "../schemas/xraylibSchemas";
import {
  actionGetAbsorptionEdgeEnergy,
  actionGetElementProperties,
  actionGetFluorescenceYields,
  actionGetTransitionsEmissionsForElement,
  actionGetXrayLevelsForElement,
} from "./xraylib-action";

import { useState, useEffect } from "react";

type ElementData = {
  edgeEnergy: number;
  fluorescenceYields: number;
  properties: ElementPropertiesResponseType;
  xrayLevels: AbsorptionEdgeResponseType;
  transitions: EmissionDataResponseType;
};

type UseElementDataResult = {
  data: ElementData;
  loading: boolean;
  error: string | null;
};

const initState: ElementData = {
  edgeEnergy: 0,
  fluorescenceYields: 0,
  properties: [],
  xrayLevels: [],
  transitions: [],
};

export function useElementData(
  selectedElementSymbol: string
): UseElementDataResult {
  const [data, setData] = useState(initState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchElementData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Use Promise.all to fetch all data concurrently
        const [
          edgeEnergyResponse,
          fluorescenceYieldsResponse,
          propertiesResponse,
          xrayLevelsResponse,
          transitionsResponse,
        ] = await Promise.all([
          actionGetAbsorptionEdgeEnergy({
            elementSymbol: selectedElementSymbol,
          }),
          actionGetFluorescenceYields({ elementSymbol: selectedElementSymbol }),
          actionGetElementProperties({ elementSymbol: selectedElementSymbol }),
          actionGetXrayLevelsForElement({
            elementSymbol: selectedElementSymbol,
          }),
          actionGetTransitionsEmissionsForElement({
            elementSymbol: selectedElementSymbol,
          }),
        ]);

        // Extract and validate data fields
        const edgeEnergy = edgeEnergyResponse?.data?.energy ?? 0;
        const fluorescenceYields =
          fluorescenceYieldsResponse?.data?.yieldValue ?? 0;
        // const propertyX = propertyXResponse?.data?.value ?? 0; // Replace `value` with the actual field
        // const propertyY = propertyYResponse?.data?.value ?? 0; // Replace `value` with the actual field
        const properties = propertiesResponse?.data?.data ?? [];
        const xrayLevels = xrayLevelsResponse?.data?.data ?? [];
        const transitions = transitionsResponse?.data?.data ?? [];

        // Update the state with fetched data
        setData({
          edgeEnergy,
          fluorescenceYields,
          properties,
          xrayLevels,
          transitions,
        });
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching element data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchElementData();
  }, [selectedElementSymbol]);

  return {
    data,
    loading,
    error,
  };
}
