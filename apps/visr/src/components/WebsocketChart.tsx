import React, { useEffect, useRef, useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';


type Dataset = {
    label: string,
    data: any[]
}

type Data = {
    labels: any[],
    datasets: Dataset[]

}
type DataPoint = {
    time: number;
    value: number;
};


const initialData: Data = { labels: [], datasets: [{ label: 'Real-Time Data', data: [] }] };

function WebsocketChart() {
  const [data, setData] = useState<DataPoint[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null); // Track connection errors
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0); // Track reconnect attempts
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      setConnectionError(null); // Clear any existing errors
      ws.current = new WebSocket("ws://localhost:8080/ws"); // Adjust your WebSocket URL

      ws.current.onopen = () => {
        console.log("WebSocket connected");
        reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
      };

      ws.current.onmessage = (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          setData((prevData) => {
            const newData = [...prevData, { time: parsedData.time, value: parsedData.value }];
            return newData.slice(-50); // Keep only the last 50 data points
          });
        } catch (error) {
          console.error("Failed to parse incoming WebSocket message:", error);
        }
      };

      ws.current.onerror = (event) => {
        console.error("WebSocket error:", event);
        setConnectionError("WebSocket connection error.");
      };

      ws.current.onclose = (event) => {
        console.warn("WebSocket closed:", event.reason);
        setConnectionError("WebSocket connection lost. Attempting to reconnect...");
        attemptReconnect();
      };
    };

    const attemptReconnect = () => {
      if (reconnectAttempts.current >= 5) {
        setConnectionError("Unable to reconnect after multiple attempts.");
        return;
      }

      reconnectAttempts.current += 1;
      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // Exponential backoff (max 30 seconds)

      console.log(`Attempting to reconnect in ${delay / 1000} seconds...`);
      reconnectTimeout.current = setTimeout(() => {
        connectWebSocket();
      }, delay);
    };

    // Start WebSocket connection
    connectWebSocket();

    // Cleanup WebSocket connection and clear timeouts on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
      if (reconnectTimeout.current) {
        clearTimeout(reconnectTimeout.current);
      }
    };
  }, []);

  return (
    <div className="websocketed">
      <h3>Real-Time Data</h3>
      {connectionError && <p style={{ color: "red" }}>{connectionError}</p>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleTimeString()}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default WebsocketChart;
