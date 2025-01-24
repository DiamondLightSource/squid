"use client";
import {
  actionGetAbsorptionEdgeEnergy,
  actionGetFluorescenceYields,
} from "./xraylib-action";

import { useState, useEffect } from "react";

type UseElementDataResult = {
  data: {
    edgeEnergy: number;
    fluorescenceYields: number;
    propertyX: number; // Example additional property
    propertyY: number; // Example additional property
  };
  loading: boolean;
  error: string | null;
};

export function useElementData(
  selectedElementSymbol: string
): UseElementDataResult {
  const [data, setData] = useState({
    edgeEnergy: 0,
    fluorescenceYields: 0,
    propertyX: 0, // Initialize placeholders for additional data
    propertyY: 0,
  });
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
          // propertyXResponse,
          // propertyYResponse,
        ] = await Promise.all([
          actionGetAbsorptionEdgeEnergy({
            elementSymbol: selectedElementSymbol,
          }),
          actionGetFluorescenceYields({ elementSymbol: selectedElementSymbol }),
          // actionGetPropertyX({ elementSymbol: selectedElementSymbol }), // Replace with your actual API call
          // actionGetPropertyY({ elementSymbol: selectedElementSymbol }), // Replace with your actual API call
        ]);

        // Extract and validate data fields
        const edgeEnergy = edgeEnergyResponse?.data?.energy ?? 0;
        const fluorescenceYields =
          fluorescenceYieldsResponse?.data?.yieldValue ?? 0;
        // const propertyX = propertyXResponse?.data?.value ?? 0; // Replace `value` with the actual field
        // const propertyY = propertyYResponse?.data?.value ?? 0; // Replace `value` with the actual field

        const propertyX = 0; // Replace `value` with the actual field
        const propertyY = 0; // Replace `value` with the actual field
        // Update the state with fetched data
        setData({
          edgeEnergy,
          fluorescenceYields,
          propertyX,
          propertyY,
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
