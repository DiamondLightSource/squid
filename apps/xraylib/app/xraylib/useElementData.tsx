"use client";

import { ElementPropertiesResponseType, AbsorptionEdgeResponseType, EmissionDataResponseType } from "../schemas/xraylibSchemas";
import {
  actionGetElementProperties,
  actionGetTransitionsEmissionsForElement,
  actionGetXrayLevelsForElement,
} from "./xraylib-action";

import { useState, useEffect } from "react";

type ElementData = {
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
      console.log(`starting the query for ${selectedElementSymbol}`);

      try {
        // Use Promise.all to fetch all data concurrently
        const [
          propertiesResponse,
          xrayLevelsResponse,
          transitionsResponse,
        ] = await Promise.all([
          actionGetElementProperties({ elementSymbol: selectedElementSymbol }),
          actionGetXrayLevelsForElement({
            elementSymbol: selectedElementSymbol,
          }),
          actionGetTransitionsEmissionsForElement({
            elementSymbol: selectedElementSymbol,
          }),
        ]);

        // Extract and validate data fields
        const properties = propertiesResponse?.data?.data ?? [];
        const xrayLevels = xrayLevelsResponse?.data?.data ?? [];
        const transitions = transitionsResponse?.data?.data ?? [];

        // Update the state with fetched data
        setData({
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
