// src/hooks/useDevices.ts
import { useState, useEffect, useCallback } from "react";

interface Device {
  name: string;
  status: string;
  // other device properties
}

const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/devices");
      if (!response.ok) {
        throw new Error("Failed to fetch devices");
      }
      const data = await response.json();
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return { devices, loading, error, fetchDevices };
};

export default useDevices;
