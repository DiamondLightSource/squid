// src/hooks/usePlans.ts
import { useState, useEffect, useCallback } from "react";

export interface Plan {
  name: string;
  description: string;
  schema?: any;
  // other plan properties
}

const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/plans");
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return { plans, loading, error, fetchPlans };
};

export default usePlans;
