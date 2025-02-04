// src/hooks/useWorkerStatus.ts
import { useState, useEffect, useCallback } from "react";

const useWorkerStatus = () => {
  const [status, setStatus] = useState<string>("idle");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkerStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/worker/status");
      if (!response.ok) {
        throw new Error("Failed to fetch worker status");
      }
      const data = await response.json();
      setStatus(data.status);
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkerStatus();
    const intervalId = setInterval(fetchWorkerStatus, 5000);
    return () => clearInterval(intervalId);
  }, [fetchWorkerStatus]);

  return { status, loading, error, fetchWorkerStatus };
};

export default useWorkerStatus;
