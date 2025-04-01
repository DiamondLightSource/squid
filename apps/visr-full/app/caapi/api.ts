import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";
import { CAMessage, CAMessageSchema } from "./CAMessage";
import { reactToCorrectMessage } from "./reactToCorrectMessage";

export default async function SocketHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log("SocketHandler called");
  if (!res.socket) {
    return res.status(500).json({ error: "WebSocket support missing in response" });
  }

  if ((res.socket as any).server.io) {
    console.log("Socket is already running");
    res.end();
    return;
  }

  console.log("Socket is initializing");
  const httpServer: NetServer = res.socket.server as any;
  const io = new ServerIO(httpServer, {
    path: "/api/socket",
    addTrailingSlash: false,
    cors: {
      origin: "*", // Adjust based on your CORS policy
      methods: ["GET", "POST"],
    },
  });

  (res.socket as any).server.io = io;

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("input-change", async (msg) => {
      try {
        const parsedMessage: CAMessage = CAMessageSchema.parse(msg);
        await reactToCorrectMessage(parsedMessage);
        socket.broadcast.emit("update-input", msg);
      } catch (error) {
        console.error("Error parsing message:", error);
        socket.emit("error", "Invalid message format");
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  res.end();
}
