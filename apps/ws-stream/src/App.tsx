import { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Replace with your WebSocket server URL
    const socket = new WebSocket("wss://example.com/socket");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data); // Parse JSON
        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error("Invalid JSON:", event.data);
      }
    };

    socket.onopen = () => console.log("Connected to WebSocket");
    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close(); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
