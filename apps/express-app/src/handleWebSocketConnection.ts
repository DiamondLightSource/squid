const generateRandomValue = () => {
  const axes = ["x", "y", "z"];
  return {
    value: parseFloat((Math.random() * 20 - 10).toFixed(2)),
    pv: axes[Math.floor(Math.random() * axes.length)],
  };
};
export function handleWebSocketConnection(ws: any) {
  console.log("WebSocket client connected");

  const interval = setInterval(() => {
    const data = generateRandomValue();
    ws.send(JSON.stringify(data));
  }, 1000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("WebSocket client disconnected");
  });
}
