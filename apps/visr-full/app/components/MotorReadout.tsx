"use client";

import React, { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Container, Button, Typography, Box, TextField } from "@mui/material";
import { z } from "zod";
import { CAMessage, CAMessageSchema } from "../caapi/CAMessage";

const MotorController: React.FC = () => {
    const [socketUrl] = useState("ws://localhost:3000/api/socket");
    const [messageHistory, setMessageHistory] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,
    });

    // Handle incoming messages
    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => [...prev, lastMessage.data]);
        }
    }, [lastMessage]);

    // Send a formatted WebSocket message
    const handleSendMessage = useCallback(() => {
        try {
            const messageObject: CAMessage = {
                type: "move",
                direction: "X",
                new_value: parseFloat(message) || undefined,
            };
            const parsedMessage = CAMessageSchema.parse(messageObject);
            sendMessage(JSON.stringify(parsedMessage));
        } catch (error) {
            console.error("Invalid message format:", error);
        }
    }, [message, sendMessage]);

    // Connection status display
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting...",
        [ReadyState.OPEN]: "Connected",
        [ReadyState.CLOSING]: "Closing...",
        [ReadyState.CLOSED]: "Disconnected",
        [ReadyState.UNINSTANTIATED]: "Not Connected",
    }[readyState];

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                WebSocket Demo
            </Typography>
            <Typography variant="subtitle1">Status: {connectionStatus}</Typography>

            <Box display="flex" alignItems="center" gap={2} marginTop={2}>
                <TextField
                    label="New Value"
                    variant="outlined"
                    type="number"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={readyState !== ReadyState.OPEN}
                >
                    Send
                </Button>
            </Box>

            <Box marginTop={4}>
                <Typography variant="h6">Message History:</Typography>
                {messageHistory.length > 0 ? (
                    messageHistory.map((msg, idx) => (
                        <Typography key={idx} variant="body2">
                            {msg}
                        </Typography>
                    ))
                ) : (
                    <Typography variant="body2">No messages yet.</Typography>
                )}
            </Box>
        </Container>
    );
};

export default MotorController;
