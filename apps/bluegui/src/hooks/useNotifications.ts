// src/hooks/useNotifications.ts
import { useState, useEffect, useCallback } from "react";

export interface UserNotification {
  message: string;
  // other notification properties
}

const useNotifications = () => {
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/notifications");
      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return { notifications, loading, error, fetchNotifications };
};

export default useNotifications;
