import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string, handleMessage: Function) => {
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const reconnectAttempts = useRef(0);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const ws = useRef<WebSocket | null>(null);

    const connectWebSocket = () => {
        try {
            setConnectionError(null); // Clear any existing errors
            ws.current = new WebSocket(url); // Use passed URL for WebSocket

            ws.current.onopen = () => {
                console.log("WebSocket connected");
                reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
            };

            ws.current.onmessage = (event) => {
                try {
                    const parsedData = JSON.parse(event.data);
                    console.log("Received message:", parsedData);
                    handleMessage(parsedData);
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
        } catch (error) {
            console.error("Error setting up WebSocket:", error);
            setConnectionError("Failed to initialize WebSocket connection.");
        }
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
    useEffect(() => {
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
    }, [url]);

    return { connectionError };
};

export default useWebSocket;
