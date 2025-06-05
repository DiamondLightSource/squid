import http from "http";
import { WebSocket, WebSocketServer } from "ws";

import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";

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

function handleRasterClientConnection(ws: WebSocket): any {
  console.log("Raster WebSocket connected");

  let x = 0, y = 0, z = 0;
  let direction = 1;

  const sendNext = () => {

    // if (y > 10) return ws.close();
    if (y >= 10) {
      // restart the count
      x = 0; y = 0; z = 0;
      direction = 1;
    }

    ws.send(JSON.stringify({ value: x, pv: "x" }));
    ws.send(JSON.stringify({ value: y, pv: "y" }));
    ws.send(JSON.stringify({ value: z, pv: "z" }));

    if (direction === 1) {
      x++;
      if (x > 10) {
        x = 10;
        y++;
        direction = -1;
      }
    } else {
      x--;
      if (x < 0) {
        x = 0;
        y++;
        direction = 1;
      }
    }
  };

  const interval = setInterval(() => {
    sendNext();
    if (y > 10) {
      clearInterval(interval);
      x = 0, y = 0, z = 0;
    }
  }, 300); // faster updates

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Raster client disconnected");
  });
}

const createExpress = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};

const port = process.env.PORT || 3002;

const app = createExpress();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {

  if (req.url === "/raster") {
    console.log("Raster WebSocket connection established");
    handleRasterClientConnection(ws);
    return;
  }

  handleWebSocketConnection(ws);

});

server.listen(port, () => {
  console.log(`HTTP + WS server running on http://localhost:${port}`);
});
