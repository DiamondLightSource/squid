import React, { useState, useEffect } from "react";

const TaskStatus = ({ task_id }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `/tasks/${task_id}`;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [task_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const getStatusIndicator = () => {
    if (task.is_complete) {
      return { color: "green", symbol: "✔️", label: "Complete" };
    } else if (task.is_pending) {
      return { color: "yellow", symbol: "⏳", label: "Pending" };
    } else if (task.errors && task.errors.length > 0) {
      return { color: "red", symbol: "❌", label: "Error" };
    } else {
      return { color: "gray", symbol: "⚪", label: "Unknown" };
    }
  };

  const { color, symbol, label } = getStatusIndicator();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: color,
        }}
        aria-label={label}
      />
      <span>{symbol}</span>
      <span>{label}</span>
    </div>
  );
};

export default TaskStatus;
