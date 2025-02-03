// src/hooks/useTaskHistory.ts
import { useState, useEffect, useCallback } from "react";

interface Task {
  task_id: string;
  task: string;
  is_complete: boolean;
  is_pending: boolean;
  errors: string[];
}

const useTaskHistory = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch task history");
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTaskHistory();
  }, [fetchTaskHistory]);

  return { tasks, loading, error, fetchTaskHistory };
};

export default useTaskHistory;
