import { createServer } from "./server";
import http from "http";
import { WebSocketServer } from "ws";
import { handleWebSocketConnection } from "./handleWebSocketConnection";
import { handleRasterClientConnection } from "./with-raster";

const port = process.env.PORT || 3001;

const app = createServer();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  handleWebSocketConnection(ws);
});

const rasterWss = new WebSocketServer({ server, path: "/raster" });

rasterWss.on("connection", handleRasterClientConnection());

server.listen(port, () => {
  console.log(`HTTP + WS server running on http://localhost:${port}`);
});